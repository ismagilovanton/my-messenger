import { Router } from '../framework/Router';
import { ErrorPage } from '../views/error';
import { HomePage } from '../views/home';
import { IndexPage } from '../views/index';
import { NotFoundPage } from '../views/not-found';
import { ProfilePage } from '../views/profile';
import { SignInPage } from '../views/signin';
import { SignUpPage } from '../views/signup';
import { AuthAPI } from '../api/auth.api';
import store from '../stores/store';

const router = new Router('#app');

// Middleware для проверки авторизации
async function authMiddleware(next: () => void): Promise<void> {
  try {
    const auth = new AuthAPI();
    const isAuthorized = await auth.getUser();
    console.log(isAuthorized);
    store.set('user', isAuthorized);

    if (!isAuthorized && !['/signin', '/signup'].includes(window.location.pathname)) {
      await router.go('/');
      return;
    }

    next();
  } catch (error: any) {
    if (error.status === 401) {
      await router.go('/');
      return;
    }
    await router.go('/error');
  }
}

async function redirectIfAuthorized(next: ()=>void) {
  try {
    const auth = new AuthAPI();
    const user = await auth.getUser();
    
    if (user) {
      store.set('user', user);
      await router.go('/messenger');
      return;
    }
    
    next();
  } catch (error) {
    next();
  }
}

router
  .use('/', SignInPage, redirectIfAuthorized)
  .use('/sign-up', SignUpPage, redirectIfAuthorized)
  .use('/settings', ProfilePage,  authMiddleware)
  .use('/not-found', NotFoundPage)
  .use('/error', ErrorPage)
  .use('/messenger', HomePage, authMiddleware)
  .use('/', IndexPage);

export default router;

