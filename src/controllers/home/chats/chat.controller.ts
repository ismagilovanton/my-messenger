
import { ChatService } from '../../../services/auth/chat.service';
import { Chat } from '../../../types/chat.types';

import store from '../../../stores/store';
export class ChatController {

  private chatService: ChatService;

  constructor() {
    this.chatService = new ChatService();
  }

  async getChats() {
    const data =  await this.chatService.getChats();
    store.set('chats', data);
    console.log(data);
    return data;
  }

  selectChat(id: number) {

    const state = store.getState();
    const chat = state.chats.find((item: Chat) => item.id === id);

    store.set('selectedChat', chat);

    console.log(chat);
    return chat;
  }

  async createChat(chatName: string) {

    const chat = await this.chatService.createChat(chatName);
    await this.getChats();
    return chat;
  }
}
