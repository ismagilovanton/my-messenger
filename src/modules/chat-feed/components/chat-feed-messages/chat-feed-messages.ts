
import Block from '../../../../framework/Block';
import template from './chat-feed-messages.tmpl';
import './chat-feed-messages.scss';
import { Placeholder } from '../../../../components/Placeholder/placeholder';

export class ChatFeedMessages extends Block {

  constructor(props: any) {

    const placeholder = new Placeholder({
      props: {
        text: 'Чат пуст',
      },
    });

    super('div', {
      ...props,
      children: {
        placeholder,
      },
    });
  }

  render() {
    return template;
  }
}
