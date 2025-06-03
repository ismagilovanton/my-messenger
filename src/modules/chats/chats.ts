import Block from '../../framework/Block';
import { ChatComponent } from './components/chat/chat';
import './chats.scss';

import template from './chats.tmpl';
import { ChatController } from '../../controllers/home/chats/chat.controller';
import { Button } from '../../components/Button/button';
import { connect, mapChatsToProps, mapSelectedChatToProps } from '../../utils/connect.util';

interface ChatsListProps {
  items?: {
    chats: ChatComponent[];
  };
  events?: {
    [key: string]: (e: Event) => void;
  };
  [key: string]: unknown; // Для дополнительных свойств, если они есть
}
class ChatsList extends Block {

  private chatController: ChatController;

  constructor(props: ChatsListProps) {
   
    const submit = new Button({
      attributes: {
        id: 'submit',
        class: 'button-main',
        type: 'submit',
        name: 'submit',
      },
      props: {
        text: 'Создать чат',
      },
      events: {
        click: (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          
          const chatName = prompt('Введите название чата:');
          if (chatName) {
            this.chatController.createChat(chatName);
          }
        },
      },
    });
    
    super('ul', {
      ...props,
      children: {
        button: submit,
      },
      items: { 
        chats: [], 
      },
      events: {
        click: (e: Event) => {
          const target = e.currentTarget as HTMLElement | null;
          const id = Number(target?.getAttribute('data-id'));
      
          if (id) {
            this.chatController.selectChat(id);
          }
        },
      },
    });

    this.chatController = new ChatController(this);
    this.chatController.getChats();

  }

  override render(): string {
    return template;
  }

  addEvents(): void {
    const chats = this.element?.querySelectorAll('.chat');
    
    chats?.forEach((chat) => {
      Object.keys(this._events).forEach((eventName) => {
        chat.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
  
          this._events[eventName](e); 
        });
      });
    });
  }
}

export default connect<ChatsListProps>(mapChatsToProps)(ChatsList);




