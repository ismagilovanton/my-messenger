
import Block from '../../../../framework/Block';
import template from './chat-feed-header.tmpl';
import './chat-feed-header.scss';
import { connect, mapSelectedChatToProps } from '../../../../utils/connect.util';

import { Button } from '../../../../components/Button/button';
import { ChatFeedController } from '../../../../controllers/home/chats-feed/chats-feed.controller';
import { Chat } from '../../../../types/chat.types';

interface ChatHeaderProps {
  props?: {
    selectedChat: Chat
  }
}

class ChatHeader extends Block {
  private chatFeedController: ChatFeedController;

  constructor(tagName = 'div', props?: ChatHeaderProps) {
    
    const openUsersList = new Button({
      props: {
        text: 'Пользователи',
      },
      attributes: {
        class: 'button-main',
        id: 'button-main',
        name: 'test',
      },
      events: {
        click: () => {
          this.chatFeedController.openUsersSettings().catch((error) => console.log(error));
        },
      },
    });
    super(tagName, { ...props, children: { openUsersList } });
    this.chatFeedController = new ChatFeedController();
  }

  override render() {
    return template;
  }

}

export default connect<{ selectedChat: Chat | null }>(mapSelectedChatToProps)(ChatHeader);

