
import Block from '../../framework/Block';
import template from './error.tmpl';
import './error.scss';

interface ErrorProps {
  props: {
    code: number;
    message: string;
  },
  children: {
    action?: Block
  }
}

export class ErrorCard extends Block {
  constructor(props: ErrorProps) {
    super('div', { ...props });
  }

  override render() {
    return template;
  }
}

