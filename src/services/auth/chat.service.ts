import { ChatAPI } from '../../api/chat.api';

export class ChatService {

  private api: ChatAPI;

  constructor() {
    this.api = new ChatAPI();
  }

  async getChats() {
    return this.api.getChats();
  }

  async createChat(title: string) {
    const chat = await this.api.createChat({ title });
    return chat;
  }

  async getChatById(id: number) {
    const chat = await this.api.getChatById(id);
    return chat;
  }

}
