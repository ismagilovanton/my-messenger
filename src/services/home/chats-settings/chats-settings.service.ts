import { ChatAPI } from '../../../api/chat.api';

export class ChatSettingsService {
  private api: ChatAPI;

  constructor() {
    this.api = new ChatAPI();
  }

  async getChatUsers(id: number) {
    const users = await this.api.getChatUsers(id);
    return users;
  }


  async addUserToChat(payload: { users: Array<number>; chatId: number }) {
    const data  = await this.api.addUserToChat(payload);
    return data;
  }

  async removeUserFromChat(payload: { users: Array<number>; chatId: number }) {
    const data = await this.api.removeUserFromChat(payload);
    return data;
  }

  async removeChat(id: number) {
    const data = await this.api.removeChat({ chatId:id });
    return data;
  }
}

