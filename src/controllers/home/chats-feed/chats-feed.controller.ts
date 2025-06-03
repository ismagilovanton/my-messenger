import { ChatFeedService } from '../../../services/home/chats-feed/chat-feed.service';
import { ChatSettingsService } from '../../../services/home/chats-settings/chats-settings.service';
import store from '../../../stores/store';

export class ChatFeedController {

  private chatSettingsService: ChatSettingsService;

  private chatFeedService: ChatFeedService;

  constructor() {
    this.chatSettingsService = new ChatSettingsService();
    this.chatFeedService = new ChatFeedService();
  }

 

  sendMessage(message: string) {
    console.log(message);
  }

  async openUsersSettings() {
    console.log('Open users list');
    store.set('chatSettingState', true);

    const state = store.getState();

    if (!state.selectedChat) {
      console.error('No selected chat to open users settings');
      return;
    }
    const id = state.selectedChat.id;
    const chatUsers = await this.chatSettingsService.getChatUsers(id);
    return chatUsers;
  }

  async getChatToken(id: number) {
    console.log('GET TOKEN');
    
    const data =  await this.chatFeedService.getChatToken(id);
    
    console.log(data);
    return data.token;
  }
}

