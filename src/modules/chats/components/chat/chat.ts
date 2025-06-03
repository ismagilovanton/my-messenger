
import Block from '../../../../framework/Block';
import template from './chat.tmpl';
import './chat.scss';


export interface Chat {
  id: number;
  name: string;
  date: string;
  message: string;
  count: number;
  [key: string]: unknown; // Add index signature to conform to Record<string, unknown>
}

interface ChatProps {
  props: Chat,
  attributes: {
    'data-id': string
  }
}

export class ChatComponent extends Block {
  constructor(props: ChatProps) {
    super('li', { ...props });
  }

  override render(): string {
    return template;
  }
}

