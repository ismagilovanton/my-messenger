import Block from '../../framework/Block';
import template from './buttonIcon.tmpl';

interface ButtonIconProps {
  attributes?: { 
    class: 'button-text' | 'button-main';
    id: string;
    name: string;
    type: string
  };
  props: {
    icon: {
      src: string,
      alt: string
    }
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
