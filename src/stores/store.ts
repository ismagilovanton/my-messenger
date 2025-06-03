
import { set } from '../utils/object.util';
import EventBus from '../framework/EventBus';
import { Chat } from '../types/chat.types';
import { User } from '../types/user.types';


export interface Indexed {
  [key: string]: any;
  user: User | null,
  chats: Array<Chat>,
  chatSettingState?: boolean,
  selectedChat?: Chat | null,
  chatUsers: Array<User>,
  messages: Array<any>
}


export enum StoreEvents {
  Updated = 'updated',
}

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus {


  private state: Indexed = {
    user: null,
    chats: [],
    chatSettingState: false,
    selectedChat: null,
    chatUsers: [],
    messages: [],
  };

  constructor() {
    super();

    this.on(StoreEvents.Updated, () => {
      console.log('Store updated:', this.state);
    });
    
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    // метод EventBus
    this.emit(StoreEvents.Updated);
  }

  public getState(): Indexed {
    return this.state;
  }
}

export default new Store();

