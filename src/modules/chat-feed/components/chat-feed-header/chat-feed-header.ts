
import Block from '../../../../framework/Block';
import template from './chat-feed-header.tmpl';
import './chat-feed-header.scss';
import { connect, mapSelectedChatToProps } from '../../../../utils/connect.util';

import { Button } from '../../../../components/Button/button';
import { ChatFeedController } from '../../../../controllers/home/chats-feed/chats-feed.controller';

interface ChatHeaderProps {
  props?: {
    name: string
  }
}

class ChatHeader extends Block {
  private chatFeedController: ChatFeedController;

  constructor(props: ChatHeaderProps) {
    
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
          this.chatFeedController.openUsersSettings();
        },
      },
    });
    super('div', { ...props, children: { openUsersList } });
    this.chatFeedController = new ChatFeedController();
  }

  override render() {
    return template;
  }

}

export default connect<ChatHeaderProps>(mapSelectedChatToProps)(ChatHeader);
