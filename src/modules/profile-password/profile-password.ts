import Block from '../../framework/Block';

import { Button } from '../../components/Button/button';
import { InputComponent } from '../../components/Input/input';
import { Form } from '../../components/Form/form';

import template from './profile-password.tmpl';
import { ProfilePasswordController } from '../../controllers/profile/profile-password.controller';

export class ProfilePassword extends Block {
  constructor() {

    const profilePasswordController = new ProfilePasswordController();

    const formPasswordInputs = [
      { label: 'Старый пароль', error: '', value: '', type: 'password', name: 'oldPassword', placeholder: 'Введите старый пароль' },
      { label: 'Новый пароль', error: '', value: '', type: 'password', name: 'newPassword', placeholder: 'Введите новый пароль' },
    ];

    const inputsPassword = formPasswordInputs.map(el=> {
      return new InputComponent({
        attributes: {  class: 'input-inline' },
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
        text: 'Изменить пароль',
      },
    });

    const formPassword = new Form({
      attributes: {
        class: 'auth-wrapper__form',
        action: '/',
      },
      children: {
        submit,
      },
      items: {
        inputs: inputsPassword,
      },
      events: {
        submit: (e) => {
          const target = e.currentTarget;
          if (target instanceof HTMLFormElement) {
            const formData = new FormData(target);
           
            profilePasswordController.updatePassword(formData);
          }
        },
      },
    });
    

    super('div', {
      children: {
        form: formPassword,
      },
    });
  }

  render() {
    return template;
  }
}

