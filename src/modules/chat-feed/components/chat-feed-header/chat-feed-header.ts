
import Block from '../../../../framework/Block';
import template from './chat-feed-header.tmpl';
import './chat-feed-header.scss';



export class ChatHeader extends Block {
  constructor(props: any) {
    super('div', { ...props });
  }

  override render() {
    return template;
  }

}
