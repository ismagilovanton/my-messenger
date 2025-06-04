import Block from '../../framework/Block';
import template from './buttonIcon.tmpl';

interface ButtonIconProps {
  attributes?: { 
    class: string;
    id?: string;
    name?: string;
    type: string
  };
  props: {
    icon: {
      src: string,
      alt: string
    }
  }
  events?: {
    click: () => void
  }
}

export  class ButtonIcon extends Block {
  constructor(props:ButtonIconProps) {
    super('button', { ...props });
  }

  override render() {
    return template;
  }
}


