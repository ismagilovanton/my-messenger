import { ChatFeedService } from '../../../services/home/chats-feed/chat-feed.service';

export class ChatFeedController {

  private service: ChatFeedService;

  constructor() {
    this.service = new ChatFeedService();
  }

  sendMessage() {
    this.service.sendMessage();
  }
  
}

