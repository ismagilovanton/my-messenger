import Block from '../../framework/Block';
import template from './chat-feed.tmpl';
import './chat-feed.scss';

import ChatHeader  from './components/chat-feed-header/chat-feed-header';
import { ChatFeedInput } from './components/chat-feed-input/chat-feed-input';
import ChatFeedMessages from './components/chat-feed-messages/chat-feed-messages';
import { Chat, ChatMessage } from '../../types/chat.types';
import { mapSelectedChatToProps } from '../../utils/connect.util';
import { connect } from '../../utils/connect.util';
import WebSocketService from '../../framework/Websocket';
import store from '../../stores/store';
import { ChatFeedController } from '../../controllers/home/chats-feed/chats-feed.controller';
import { formDataToObject } from '../../utils/formdata.util';
interface ChatsFeedProps  {
  children?: {
    header?: Block
    messages?: Block
    input?: Block
  },
  props: {
    selectedChat?: Chat | null,
  }
}

class ChatsFeed extends Block {

  private wsService: WebSocketService;

  private chatFeedController: ChatFeedController;

  constructor(tagName?: string, props?: ChatsFeedProps) {

    const header = new ChatHeader();
    const messages = new ChatFeedMessages();
    const input = new ChatFeedInput('div', {
      events: {
        submit: (e) => {
          const target = e.currentTarget;
          if (target instanceof HTMLFormElement) {
            const formData = new FormData(target);
            const data = formDataToObject<{ message: string }>(formData);
            if (data.message) {
              this.wsService.send({
                content: data.message,
                type: 'message',
              });
              target.value = '';
            }
          }
        
        },
      },
    });
    
    
    super(tagName ?? 'div', {
      ...props,
    });
    
    this.setChildren( {
      header,
      messages,
      input,
    });
    
    this.chatFeedController = new ChatFeedController();

    this.wsService = new WebSocketService({
      onMessage: this.handleMessage.bind(this),
      onError: this.handleError.bind(this),
      onHistory: this.handleHistory.bind(this),
    });
  }

  override componentDidUpdate() {

    const state = store.getState();
    if (state.selectedChat) {
      this.wsService.close();
      // Run async logic without awaiting to keep method synchronous
      this.connectToChat().catch(error => {console.log(error);});
    }

    return true;
  }

  async connectToChat() {
    const state = store.getState();
    const userId = state.user?.id; // Добавьте получение ID пользователя
    const chatId = state.selectedChat?.id;
    
    if (chatId && userId) {
      const token =  await this.chatFeedController.getChatToken(chatId);
      this.wsService.connect(chatId, userId, token);
    }
  }

  private handleHistory(data: Array<ChatMessage>) {
    const sortedMessages = data.sort((a, b) => b.id - a.id);
    store.set('messages', sortedMessages);
  }

  private handleMessage(data: Array<ChatMessage> | ChatMessage) {
    const state = store.getState();
    store.set('messages', [...(state.messages || []), data]);
  }

  private handleError(error: Event) {
    console.error('Ошибка WebSocket:', error);
  }

  override render() {
    return template;
  }
}


export default connect<{ selectedChat: Chat | null }>(mapSelectedChatToProps)(ChatsFeed);
