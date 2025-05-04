import Block from '../../framework/Block';
import template from './error.tmpl';
import './error.scss';
export class ErrorLayout extends Block {
  constructor(props: any) {
    super('div', {
      ...props,
    });
  }

  override render() {
    return template;
  }
}
