import Block from '../../../../framework/Block';
import template from './chat-feed-messages.tmpl';
import './chat-feed-messages.scss';
import { Placeholder } from '../../../../components/Placeholder/placeholder';
import { connect, mapMessagesToProps } from '../../../../utils/connect.util';
import { Chat, ChatMessage } from '../../../../types/chat.types';
import store from '../../../../stores/store';

interface ChatFeedMessagesProps {
  props?: {
    messages: Array<any>,
    selectedChat: Chat,
    currentUserId: number
  }
}

class ChatFeedMessages extends Block {

  constructor(tagName: string = 'div', props?: ChatFeedMessagesProps ) {
    
    const state = store.getState();
    const currentUserId = state.user?.id;
    const placeholder = new Placeholder({
      props: {
        text: 'Чат пуст',
      },
    });
    
    super(tagName, {
      ...props,
      props: {
        currentUserId: currentUserId,
      },
      children: {
        placeholder,
      },
    });   
  }

  render() {
    return template;
  }
}

export default connect<{ messages: Array<ChatMessage>, selectedChat: Chat | null }>(mapMessagesToProps)(ChatFeedMessages);

