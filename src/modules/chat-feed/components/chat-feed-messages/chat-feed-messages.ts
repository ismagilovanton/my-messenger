import Block from '../../../../framework/Block';
import template from './chat-feed-messages.tmpl';
import './chat-feed-messages.scss';
import { Placeholder } from '../../../../components/Placeholder/placeholder';
import { connect, mapMessagesToProps } from '../../../../utils/connect.util';
import { Chat } from '../../../../types/chat.types';
import store from '../../../../stores/store';

interface ChatFeedMessagesProps {
  props?: {
    messages: Array<any>,
    selectedChat: Chat,
    currentUserId: number
  }
}

class ChatFeedMessages extends Block {



  constructor(tagName = 'div', props: ChatFeedMessagesProps) {
    
    
    const placeholder = new Placeholder({
      props: {
        text: 'Чат пуст',
      },
    });
    
    super(tagName, {
      ...props,
      props: {
        currentUserId: store.getState()?.user.id | 0,
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

export default connect<ChatFeedMessagesProps>(mapMessagesToProps)(ChatFeedMessages);
