import Block from '../../framework/Block';
import { ChatComponent } from './components/chat/chat';
import './chats.scss';

import template from './chats.tmpl';
import { chatsMock } from '../../mocks/chats.mock';
import { ChatController } from '../../controllers/home/chats/chat.controller';

interface ChatsListProps {
  items?: {
    chats: ChatComponent[];
  };
  events?: {
    [key: string]: (e: Event) => void;
  };
  [key: string]: unknown; // Для дополнительных свойств, если они есть
}
export class ChatsList extends Block {

  private controller: ChatController;

  constructor(props: ChatsListProps) {
    const chats = chatsMock.map(chatMock => 
      new ChatComponent({ props: chatMock, attributes: { 'data-id': chatMock.id.toString() } }));
    
    super('ul', {
      ...props,
      items: { 
        chats: chats, 
      },
      events: {
        click: (e: Event) => {
          const target = e.currentTarget as HTMLElement | null;
          const id = Number(target?.getAttribute('data-id'));
      
          if (id) {
            this.controller.selectChat(id);
          }
        },
      },
    });

    this.controller = new ChatController();

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
