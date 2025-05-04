import { ChatsList } from '../../../modules/chats/chats';
import { ChatService } from '../../../services/home/chats/chat.service';



export class ChatController {
  private service: ChatService;

  private view: ChatsList;

  constructor(view: ChatsList) {
    this.view = view;
    this.service = new ChatService();
  }

  selectChat(id: number) {
    this.service.getChatById(id);
  }

  loadChats() {
    this.service.loadChats();
  }
}
