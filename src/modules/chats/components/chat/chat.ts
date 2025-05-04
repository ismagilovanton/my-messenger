
import Block from '../../../../framework/Block';
import template from './chat.tmpl';
import './chat.scss';


interface Chat {
  id: number;
  name: string;
  date: string;
  message: string;
  count: number
}

interface ChatProps {
  props: Chat
}

export class ChatComponent extends Block {
  constructor(props: ChatProps) {
    super('li', { ...props });
  }

  override render(): string {
    return template;
  }
}
