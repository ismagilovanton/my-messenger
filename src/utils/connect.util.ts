import store, { StoreEvents, Indexed } from '../stores/store';
import Block from '../framework/Block';
import { isEqual } from './object.util';

import { ChatComponent } from '../modules/chats/components/chat/chat';
import { Chat } from '../types/chat.types';
import { User } from '../types/user.types';
import { UserCard } from '../components/UserCard/user-card';

export function connect<P = Record<string, unknown>>(
  mapStateToProps: (state: Indexed) => Partial<P>,
) {
  return function (Component: typeof Block) {

    return class extends Component {
      constructor(tagName: string = 'div', props: P = {} as P) {

        
        let state = mapStateToProps(store.getState());
                
        super(tagName, { ...props, ...state });
        console.log('connect', state);
        store.on(StoreEvents.Updated, () => {
                    
          const newState = mapStateToProps(store.getState());
                    
          if (!isEqual(state, newState)) {
            
            
            if (
              Object.prototype.hasOwnProperty.call(newState, 'items') &&
              typeof (this as any).setItems === 'function' &&
              (newState as { items?: unknown }).items !== undefined
            ) {
              (this as any).setItems((newState as unknown as { items: unknown }).items);
            } else {
              this.setProps({ ...newState });
            }

          }
                    
          state = newState;
        });
      }
    };
  };
}

export function mapUserToProps(state: Indexed) {
  return {
    name: state.user?.display_name,
  };
}

export function mapFullUserToProps(state: Indexed) {
  return {
    user: state?.user as User,
  };
}


export function mapChatsToProps(state: Indexed) {
  
  return {
    items: {
      chats: state.chats.map((chat: Chat)  => 
        new ChatComponent({ props: { chat }, attributes: { 'data-id': chat.id.toString() } })),
    },
  };
}

export function mapUsersToItems(state: Indexed) {
  console.log('mapUsersToItems', state.chatUsers);

  return {
    items: {
      users: state.chatUsers.map((user: User) => new UserCard({ 
        props: { user, isOwner: user.id !== state.selectedChat?.created_by },
        attributes: { 'data-id': user.id.toString() },
      })),
    },
  };
}


export function mapSelectedChatToProps(state: Indexed) {
  return {
    selectedChat: state.selectedChat || null,
  };
}


export function mapChatSettingsStateToProps(state: Indexed) {
  return {
    chatSettingState: state.chatSettingState || false,
  };
}


export function mapChatUsersToProps(state: Indexed) {
  return {
    chatUsers: state.chatUsers || [],
  };
}


export function mapMessagesToProps(state: Indexed) {
  return {
    messages: state.messages || [],
    selectedChat: state.selectedChat,
  };
}

