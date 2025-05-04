import { ChatsFeed } from '../../../modules/chat-feed/chat-feed';
import { ChatFeedService } from '../../../services/home/chats-feed/chat-feed.service';

export class ChatFeedController {

  private service: ChatFeedService;

  private view: ChatsFeed;

  constructor(
    view: ChatsFeed,
  ) {
    this.service = new ChatFeedService();
    this.view = view;
  }

  
}
