import '../../static/style.scss';
import '../../static/index.ts';

import { AuthLayout } from '../../layouts/auth/auth.ts';
import SignUpView  from './signup.ts';

import Block from '../../framework/Block.ts';

export class SignUpPage extends Block {
  constructor() {
    super('div');

    const body = new SignUpView();

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
