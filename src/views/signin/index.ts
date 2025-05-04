import '../../static/style.scss';
import '../../static/index.ts';

import { AuthLayout } from '../../layouts/auth/auth.ts';

import { SignInView } from './signin.ts';
import { renderDOM } from '../../utils/render.util.ts';


document.addEventListener('DOMContentLoaded', () => {

  const body = new SignInView({});

  const layout = new AuthLayout({
    children: {
      body,
    },
  });

  renderDOM('#app', layout);
});
