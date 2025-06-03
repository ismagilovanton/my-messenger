import { ChatSettingsController } from '../../controllers/home/chats-settings/chat-settings.controller';
import Block from '../../framework/Block';
import template from './chat-settings.tmpl';
import { Button } from '../../components/Button/button';
import './chat-settings.scss';
import { InputComponent } from '../../components/Input/input';
import { Form } from '../../components/Form/form';
import { required } from '../../framework/Validation';
import { connect, mapUsersToItems } from '../../utils/connect.util';
import { UserCard } from '../../components/UserCard/user-card';


interface ChatSettingsProps {
  items: {
    users: UserCard[];
  }
}

class ChatSettings extends Block {

  private chatSettingsController: ChatSettingsController;

  constructor(tagName = 'div') {
    const button = new Button({
     
      props: {
        text: 'Вернуться к чату',
      },
      attributes: {
        class: 'button-main',
        id: 'button-main',
        name: 'test',
      },
      events: {
        click: () => {
          this.chatSettingsController.closeSettings();
        },
      },
    });


    const submit = new Button({
      attributes: {
        id: 'submit',
        class: 'button-main',
        type: 'submit',
        name: 'submit',
      },
      props: {
        text: 'Добавить',
      },
    });

    const remove = new Button({
      props: {
        text: 'Удалить чат',
      },
      attributes: {
        class: 'button-inline danger',
        name: 'save',
        id: 'save',
      },
      events: {
        click: (e: Event) => {
          e.preventDefault();
          const target = e.target as HTMLButtonElement;
          if (target instanceof HTMLButtonElement) {
            console.log('Удалить чат');
            this.chatSettingsController.removeChat().catch((error) => console.log(error));
          }
        },
      },
    });

    const input = new InputComponent({
      props: {
        type: 'text',
        name: 'login',
        label: 'Имя пользователя',
        placeholder: 'Введите сообщение...',
        validationRules: [
          required,
        ],
      },
      attributes: {
        class: 'input-form ',
      },
    });

    const form = new Form({
      attributes: {
        class: 'chat-settings__form',
        action: '/',
      },
      items: {
        inputs: [
          input,
        ],
      },
      children: {
        submit: submit,
      },
      events: {
        submit: (e) => {
          const target = e.currentTarget;
          if (target instanceof HTMLFormElement) {
            const formData = new FormData(target);
            this.chatSettingsController.addChatUser(formData).catch((error) => console.log(error));
          }
        },
      },
    });

    super(tagName, {
      children: {
        backButton: button,
        removeButton: remove,
        form,
      },
      items: {
        users: [],
      },
      events: {
        click: (e: Event) => {
          const target = e.currentTarget as HTMLElement | null;
          const id = Number(target?.getAttribute('data-user-id'));

          if (id) {
            this.chatSettingsController.removeChatUser(id).catch((error) => console.log(error));
          }
        },
      },
    });
    this.chatSettingsController = new ChatSettingsController();
    this.chatSettingsController.getChatUsers().catch((error) => console.log(error));   
  }

  addEvents():void {
    const users = this.element?.querySelectorAll('.user-card__remove-btn');

    users?.forEach(user => {
      Object.keys(this._events).forEach((eventName) => {
        user.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
  
          this._events[eventName](e); 
        });
      });
      
    });
  }

  
  render() {
    return template;
  }

}


export default connect<ChatSettingsProps>(mapUsersToItems)(ChatSettings);
