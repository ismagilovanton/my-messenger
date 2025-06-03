import Block from '../../framework/Block';
import { Button } from '../../components/Button/button';
import { InputComponent } from '../../components/Input/input';
import { Form } from '../../components/Form/form';

import template from './profile-data.tmpl';
import {
  email,
  login,
  name,
  phone,
} from '../../framework/Validation';

import { ProfileDataController } from '../../controllers/profile/profile-data.controller';
import store from '../../stores/store';
import { connect, mapFullUserToProps } from '../../utils/connect.util';
import { User } from '../../types/user.types';

interface ProfileDataProps {
  props: {
    user?: User | null
  },
  children?: {
    form: Form;
  };
}

class ProfileData extends Block {
  private profileDataController: ProfileDataController;


  constructor(tagName = 'div', props: ProfileDataProps) {
    const state = store.getState();

    const user = state.user;

    super(tagName, {
      ...props, 
      props: {
        user,
      },
    });

    this.profileDataController = new ProfileDataController();

    const formInputs = [
      {
        label: 'Почта',
        error: '',
        value: user?.email || '',
        type: 'email',
        name: 'email',
        placeholder: 'Введите почту',
        validationRules: [email],
      },
      {
        label: 'Логин',
        error: '',
        value: user?.login || '',
        type: 'text',
        name: 'login',
        placeholder: 'Введите логин',
        validationRules: [login],
      },
      {
        label: 'Имя',
        error: '',
        value: user?.first_name || '',
        type: 'text',
        name: 'first_name',
        placeholder: 'Введите имя',
        validationRules: [name],
      },
      {
        label: 'Фамилия',
        error: '',
        value: user?.second_name || '',
        type: 'text',
        name: 'second_name',
        placeholder: 'Введите фамилию',
        validationRules: [name],
      },
      {
        label: 'Имя в чате',
        error: '',
        value: user?.display_name || '',
        type: 'text',
        name: 'display_name',
        placeholder: 'Введите имя в чате',
        validationRules: [name],
      },
      {
        label: 'Телефон',
        error: '',
        value: user?.phone || '',
        type: 'phone',
        name: 'phone',
        placeholder: 'Введите телефон',
        validationRules: [phone],
      },
    ];

    const inputsData = formInputs.map((el) => {
      return new InputComponent({
        attributes: { class: 'input-inline' },
        props: el,
      });
    });

    const submit = new Button({
      attributes: {
        id: 'submit',
        class: 'button-main',
        type: 'submit',
        name: 'submit',
      },
      props: {
        text: 'Сохранить',
      },
    });

    const form = new Form({
      attributes: {
        class: 'auth-wrapper__form',
        action: '/',
      },
      children: {
        submit,
      },
      items: {
        inputs: inputsData,
      },
      events: {
        submit: (e) => {
          e.preventDefault();
          const target = e.currentTarget;
          if (target instanceof HTMLFormElement) {
            const formData = new FormData(target);
            this.profileDataController.updateProfile(formData);
          }
        },
      },
    });

    this.setChildren({ form: form });
  }

  override render(): string {
    return template;
  }
}


export default connect<{ user: User | null }>(mapFullUserToProps)(ProfileData);
