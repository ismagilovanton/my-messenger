import { ChatAPI } from '../../../api/chat.api';

export class ChatFeedService {

  private api: ChatAPI;

  constructor() {
    this.api = new ChatAPI();
  }   

  async getChatToken(id: number) {
    return this.api.getChatToken({ id });
  }
}

