import '../../static/style.scss';
import '../../static/index.ts';

import { AuthLayout } from '../../layouts/auth/auth.ts';

import  SignInView  from './signin.ts';

import Block from '../../framework/Block.ts';
export class SignInPage extends Block {
  constructor() {
    super('div');

    const body = new SignInView();

    const layout = new AuthLayout({
      children: {
        body,
      },
    }); 

    this.setChildren({
      layout,
    });
  }

  override render() {
    return '{{{layout}}}';
  }
} 

