import Block from '../../../../framework/Block';
import template from './chat-feed-input.tmpl';
import './chat-feed-input.scss';

import { InputComponent } from '../../../../components/Input/input';
import { IconComponent } from '../../../../components/Icon/icon';
import { ButtonIcon } from '../../../../components/ButtonIcon/buttonIcon';
import { Form } from '../../../../components/Form/form';

import ArrowRight from '../../../../../public/icons/arrow-right.svg';
import Clip from '../../../../../public/icons/clip.svg';
import { required } from '../../../../framework/Validation';


interface ChatFeedInputProps {
  events: {
    submit: (e: Event) => void,
  }
}

export class ChatFeedInput extends Block {
  
  constructor(tagName: string, props: ChatFeedInputProps ) {
    const input = new InputComponent({
      props: {
        type: 'text',
        name: 'message',
        placeholder: 'Введите сообщение...',
        validationRules: [
          required,
        ],
      },
      attributes: {
        class: 'new-message__input',
      },
    });

    const icon = new IconComponent({
      attributes: {
        src: Clip,
        alt: 'clip-icon',
      },
    });

    const send = new ButtonIcon({
      attributes: {
        class: 'new-message__action',
        type: 'submit',
      },
      props: {
        icon: {
          src: ArrowRight,
          alt: 'send-icon',
        },
      },
    });

    const form = new Form({
      attributes: {
        class: 'new-message',
        action: '/',
      },
      items: {
        inputs: [
          input,
        ],
      },
      children: {
        header: icon,
        submit: send,
      },
      events: props.events,
    });

    super(tagName, 
      { 
        children: {
          form,
        },
      },
    );

  }

  override render() {
    return template;
  }
}


