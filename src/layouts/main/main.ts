import Block from '../../framework/Block';
import template from './main.tmpl';
import './main.scss';


interface MainLayoutProps {
  props?: any
  children: {
    sidebar?: Block,
    body?: Block
  }
}

export class MainLayout extends Block {

  constructor(props: MainLayoutProps) {
    super('div', {
      ...props,
    });
  }

  override render(): string {
    return template;
  }
}
