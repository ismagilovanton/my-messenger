
import { ChatSettingsService } from '../../../services/home/chats-settings/chats-settings.service';
import store from '../../../stores/store';

import { User } from '../../../types/user.types';
import { formDataToObject } from '../../../utils/formdata.util';
import { UserService } from '../../../services/user.service';

export class ChatSettingsController {



  private chatSettingsService: ChatSettingsService;

  private userService: UserService;


  constructor() {
    this.chatSettingsService = new ChatSettingsService();
    this.userService = new UserService();
  }

  closeSettings() {
    console.log('Close chat settings');
    store.set('chatSettingState', false);
  }

  async removeChat(): Promise<void> {
    console.log('Remove chat');
    const state = store.getState();
    if (!state.selectedChat) {
      throw new Error('No chat selected');
    }

    await this.chatSettingsService.removeChat(state.selectedChat.id);
    const chats = state.chats.filter(chat => chat.id !== state.selectedChat?.id);
    store.set('chats', chats);
    this.closeSettings();

  }

  async removeChatUser(userId: number) {
    console.log('Remove user from chat');
    console.log(userId);
    const state = store.getState();
    await this.chatSettingsService.removeUserFromChat({ chatId: state?.selectedChat!.id, users: [userId] });
   
    await this.getChatUsers();
  }

  async getChatUsers() {
    console.log('Get chat users');
    const state = store.getState();

    if (!state.selectedChat) {
      throw new Error('No chat selected');
    }

    const data = await this.chatSettingsService.getChatUsers(state.selectedChat.id);
    
    store.set('chatUsers', data);
    console.log(data);
    return data;
  }

  async addChatUser(formData: FormData) {

    const state = store.getState();

    const payload = formDataToObject<{ login: string }>(formData);           
    console.log('Submit form', payload);

    const data = await this.userService.searchUser(payload);

    if (!data.length) {
      throw new Error('User not found');
    }

    const user: User = data[0];

    const invite = await this.chatSettingsService.addUserToChat({ chatId: state?.selectedChat!.id, users: [user.id] });

    console.log(invite);

    await this.getChatUsers();

  }
}

