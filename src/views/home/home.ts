import Block from '../../framework/Block';
import template from './home.tmpl';
import './home.scss';
import { ChatsFeed } from '../../modules/chat-feed/chat-feed';


interface HomeViewProps {
  props?: any,
  children?: {
    body: Block
  }
}

export class HomeView extends Block {
  constructor(props: HomeViewProps) {


    const chatsFeed = new ChatsFeed();


    super('div', {
      ...props,
      children: {
        body: chatsFeed,
      },
    });
  }

  override render(): string {
    return template;
  }
}
