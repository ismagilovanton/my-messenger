import Block from '../../framework/Block';
import template from './chat-feed.tmpl';
import './chat-feed.scss';

import { ChatHeader } from './components/chat-feed-header/chat-feed-header';
import { ChatFeedInput } from './components/chat-feed-input/chat-feed-input';
import { ChatFeedMessages } from './components/chat-feed-messages/chat-feed-messages';
import { ChatFeedService } from '../../services/home/chats-feed/chat-feed.service';
import { ChatFeedController } from '../../controllers/home/chats-feed/chats-feed.controller';

interface ChatsFeedProps  {
  children?: {
    header?: Block
    messages?: Block
    input?: Block
  }
}

export class ChatsFeed extends Block {
  private controller: ChatFeedController;

  private service: ChatFeedService;
  
  constructor(props?: ChatsFeedProps) {

    const header = new ChatHeader({});
    const messages = new ChatFeedMessages({});
    const input = new ChatFeedInput({});
    
    super('div', {
      ...props,
    });

    this.service = new ChatFeedService();
    this.controller = new ChatFeedController(this);

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
