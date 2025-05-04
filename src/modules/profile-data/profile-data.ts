import Block from '../../framework/Block';
import { Button } from '../../components/Button/button';
import { InputComponent } from '../../components/Input/input';
import { Form } from '../../components/Form/form';
import { ProfileDataService } from '../../services/profile/profile-data.service';

import template from './profile-data.tmpl';
import {
  email,
  login,
  name,
  password,
  phone,
} from '../../framework/Validation';

import { ProfileDataController } from '../../controllers/profile/profile-data.controller';

interface ProfileDataProps {
  children: {
    form: Form;
  };
}

export class ProfileData extends Block {
  private controller: ProfileDataController;

  private service: ProfileDataService;

  constructor(props: ProfileDataProps) {
    const service = new ProfileDataService();
    const controller = new ProfileDataController(service);

    const profile = controller.loadProfile();

    const formDataInputs = [
      {
        label: 'Почта',
        error: '',
        value: profile.email || '',
        type: 'email',
        name: 'email',
        placeholder: 'Введите почту',
        validationRules: [email],
      },
      {
        label: 'Логин',
        error: '',
        value: profile.login || '',
        type: 'text',
        name: 'login',
        placeholder: 'Введите логин',
        validationRules: [login],
      },
      {
        label: 'Имя',
        error: '',
        value: profile.first_name || '',
        type: 'text',
        name: 'first_name',
        placeholder: 'Введите имя',
        validationRules: [name],
      },
      {
        label: 'Фамилия',
        error: '',
        value: profile.second_name || '',
        type: 'text',
        name: 'second_name',
        placeholder: 'Введите фамилию',
        validationRules: [name],
      },
      {
        label: 'Имя в чате',
        error: '',
        value: profile.display_name || '',
        type: 'text',
        name: 'display_name',
        placeholder: 'Введите имя в чате',
        validationRules: [name],
      },
      {
        label: 'Телефон',
        error: '',
        value: profile.phone || '',
        type: 'phone',
        name: 'phone',
        placeholder: 'Введите телефон',
        validationRules: [phone],
      },
      {
        label: 'Старый пароль',
        error: '',
        value: profile.oldPassword || '',
        type: 'password',
        name: 'oldPassword',
        placeholder: 'Введите пароль',
        validationRules: [password],
      },
      {
        label: 'Новый пароль',
        error: '',
        value: profile.newPassword || '',
        type: 'password',
        name: 'newPassword',
        placeholder: 'Введите пароль',
        validationRules: [password],
      },
    ];

    const inputsData = formDataInputs.map((el) => {
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

    const formData = new Form({
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
        submit: (e, data) => {
          this.controller.updateProfile(data);
        },
      },
    });

    super('div', {
      ...props,
      children: {
        form: formData,
      },
    });
    this.controller = controller;
    this.service = service;
  }

  override render(): string {
    return template;
  }
}
