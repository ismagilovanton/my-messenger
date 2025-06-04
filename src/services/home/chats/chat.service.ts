
import { chatsMock } from '../../../mocks/chats.mock';

export interface Chat extends Record<string, unknown> {
  id: number,
  img: string,
  name: string,
  message: string,
  date: string,
  count: number,
}

export class ChatService {

  getChatById(chatId: number): Chat | undefined {    
    const chat =  chatsMock.find(item => item.id == chatId);
    console.log(chat);
    return chat;
  }

  loadChats(): Array<Chat> {
    return chatsMock;
  }

}


