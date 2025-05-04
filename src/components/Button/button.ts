

import Block from '../../framework/Block';
import template from './button.tmpl';
import './button.scss';

interface ButtonProps {
  attributes?: { 
    class: 'button-text' | 'button-main' | 'button-inline';
    id: string;
    name: string;
    type?: string
  };
  props: {
    text: string;
  },
  events?: Record<string, (e: Event) => void>
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super('div', { ...props });
  }


  override render() {
    return template;
  }
}
