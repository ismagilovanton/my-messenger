import Block from '../../framework/Block';
import template from './error.tmpl';
import './error.scss';
interface ErrorLayoutProps {
  props: {
    body: Block
  }
}

export class ErrorLayout extends Block {
  constructor(props: ErrorLayoutProps) {
    super('div', {
      ...props,
    });
  }

  override render() {
    return template;
  }
}
