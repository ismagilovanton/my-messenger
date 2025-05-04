import Block from '../../framework/Block';
import template from './chat-feed.tmpl';
import './chat-feed.scss';

import { ChatHeader } from './components/chat-feed-header/chat-feed-header';
import { ChatFeedInput } from './components/chat-feed-input/chat-feed-input';
import { ChatFeedMessages } from './components/chat-feed-messages/chat-feed-messages';

interface ChatsFeedProps  {
  children?: {
    header?: Block
    messages?: Block
    input?: Block
  }
}

export class ChatsFeed extends Block {

  constructor(props?: ChatsFeedProps) {

    const header = new ChatHeader({});
    const messages = new ChatFeedMessages();
    const input = new ChatFeedInput();
    
    super('div', {
      ...props,
    });

    this.setChildren( {
      header,
      messages,
      input,
    });
  }

  override render() {
    return template;
  }
}
