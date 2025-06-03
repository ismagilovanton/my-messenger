import Block from '../../framework/Block';
import template from './home.tmpl';
import ChatsFeed  from '../../modules/chat-feed/chat-feed';
import { connect, mapChatSettingsStateToProps } from '../../utils/connect.util';
import ChatSettings  from '../../modules/chat-settings/chat-settings';
import './home.scss';

interface HomeViewProps {
  children?: {
    body: Block,
    settings: Block
  },
  props: {
    chatSettingState: boolean,
  }
}

class HomeView extends Block {
  constructor(tagName: string = 'ul', props?: HomeViewProps) {


    const chatsFeed = new ChatsFeed();

    super(tagName, {
      ...props,
      props: {
        chatSettingState: false,
      },
      children: {
        body: chatsFeed,
      },
    });
  }

  componentDidUpdate(oldProps: { chatSettingState: boolean }, newProps: { chatSettingState: boolean }): boolean {
    if (oldProps?.chatSettingState !== newProps.chatSettingState) {
      this.setChildren({
        body: newProps.chatSettingState ?  new ChatSettings() : new ChatsFeed(),
      });
      return true;
    }
    return false;
  }

  override render(): string {
    return template;
  }
}

export default connect<{ chatSettingState: boolean }>(mapChatSettingsStateToProps)(HomeView);
