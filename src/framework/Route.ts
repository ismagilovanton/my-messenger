import { renderDOM } from '../utils/render.util.ts';
import Block from './Block';


function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

export class Route {


  private _pathname: string;

  private _blockClass: new() =>Block;

  private _block: Block | null;

  private _props: any;

  constructor(pathname: string, view: new() => Block, props: { rootQuery: string; middleware?: unknown }) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  get middleware() {
    return this._props.middleware;
  }

  leave() {
    if (this._block) {
    // Удаляем элемент из DOM
      this._block.element?.remove();
      // Очищаем ссылку на блок
      this._block = null;
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      renderDOM(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}


