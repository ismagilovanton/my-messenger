import Block from './Block.ts';
import { Route } from './Route.ts';

export class Router {
  static __instance: Router;

  protected routes: Array<Route> = [];

  protected history!: History;

  private _currentRoute: Route | null = null;

  private _rootQuery!: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: new () => Block,  middleware?: (next: () => void) => void | Promise<void>) {
    const route = new Route(pathname, block, { 
      rootQuery: this._rootQuery,
      middleware, 
    });
    this.routes.push(route);
    return this;
  }


  async start() {
    // Реагируем на изменения в адресной строке и вызываем перерисовку
    window.onpopstate = async (e) => {
      const target = e.currentTarget;
      if (target instanceof Window) {
        await this._onRoute(target.location.pathname);
      }
    };

    await this._onRoute(window.location.pathname);
  }

  async _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      const errorRoute = this.getRoute('/not-found');
      if (errorRoute) {
      // Сначала удаляем текущий маршрут
        if (this._currentRoute) {
          this._currentRoute.leave();
        }
        this._currentRoute = errorRoute;
        await this.go('/not-found');
      } else {
        console.error('No route found for', pathname);
      }
      return;
    }

    // Важно: сначала удаляем старый маршрут
    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    try {
      if (route.middleware) {
        await route.middleware(() => {
          route.render();
        });
      } else {
        route.render();
      }
    } catch (e) {
      console.error(e);
      await this.go('/error');
    }
  }

  async go(pathname: string) {
    this.history.pushState({}, '', pathname);
    await this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

