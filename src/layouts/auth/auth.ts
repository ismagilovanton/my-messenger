import Block from '../../framework/Block';
import template from './auth.tmpl';
import './auth.scss';

interface AuthLayoutProps {
  children: {
    body: Block
  }
}

export class AuthLayout extends Block {
  constructor(props: AuthLayoutProps) {
    super('div', {
      ...props,
    });
  }

  override render() {
    return template;
  }
}


