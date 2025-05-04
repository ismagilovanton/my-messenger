
import Block from '../../framework/Block';
import template from './placeholder.tmpl';
import './placeholder.scss';


interface PlaceholderProps {
  props: {
    text: string
  }
}

export class Placeholder extends Block {
  constructor(props: PlaceholderProps) {
    super('div', { ...props });
    
  }

  override render(): string {
    return template;
  }

}
