
import Block from '../../framework/Block';
import template from './icon.tmpl';
import './icon.scss';

interface IconComponentProps {
  attributes: {
    src: string;
    alt: string
  }
}

export class IconComponent extends Block {
  constructor(props: IconComponentProps) {
    super('img', { ...props });
  }

  public render(): string {
    return template;
  }

}
