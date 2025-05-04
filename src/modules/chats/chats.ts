import Block from '../../framework/Block';
import { ChatComponent } from './components/chat/chat';
import './chats.scss';

import template from './chats.tmpl';
import { chatsMock } from '../../mocks/chats.mock';
import { ChatController } from '../../controllers/home/chats/chat.controller';
import { ChatService } from '../../services/home/chats/chat.service';


export class ChatsList extends Block {

  private controller: ChatController;

  private service: ChatService;

  constructor(props: any) {
    const chats = chatsMock.map(chatMock => new ChatComponent({ props: chatMock, attributes: { 'data-id':chatMock.id } }));
    
    super('ul', {
      ...props,
      items: { 
        chats: chats, 
      },
      events: {
        click: (e: Event) => {
          const id = e.currentTarget?.getAttribute('data-id');
          
          this.controller.selectChat(id);
        },
      },
    });

    this.service = new ChatService();
    this.controller = new ChatController(this);

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
