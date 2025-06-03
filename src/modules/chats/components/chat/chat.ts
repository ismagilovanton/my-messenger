
import Block from '../../../../framework/Block';
import template from './chat.tmpl';
import './chat.scss';
import { Chat } from '../../../../types/chat.types';



interface ChatProps {
  props: {
    chat: Chat
  },
  attributes: {
    'data-id': string
  }
}

export class ChatComponent extends Block {
  constructor(props: ChatProps, tagName = 'li') {
    super(tagName, { ...props });
  }

  override render(): string {
    return template;
  }
}

