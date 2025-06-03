
import Block from '../../../../framework/Block';
import template from './chat-feed-header.tmpl';
import './chat-feed-header.scss';

interface ChatHeaderProps {
  props?: {
    name: string
  }
}

export class ChatHeader extends Block {
  constructor(props: ChatHeaderProps) {
    super('div', { ...props, 
      props: {
        name: 'Данил',
      }, 
    });
  }

  override render() {
    return template;
  }

}

