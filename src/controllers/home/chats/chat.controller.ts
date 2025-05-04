import { ChatService } from '../../../services/home/chats/chat.service';

export class ChatController {
  private service: ChatService;

  constructor() {
    this.service = new ChatService();
  }

  selectChat(id: number) {
    this.service.getChatById(id);
  }

  loadChats() {
    this.service.loadChats();
  }
}
