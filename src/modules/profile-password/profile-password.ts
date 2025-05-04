import Block from '../../framework/Block';

import { Button } from '../../components/Button/button';
import { InputComponent } from '../../components/Input/input';
import { Form } from '../../components/Form/form';

import template from './profile-password.tmpl';
import { ProfilePasswordService } from '../../services/profile/profile-password.service';
import { ProfilePasswordController } from '../../controllers/profile/profile-password.controller';


export class ProfilePassword extends Block {
  constructor(props: any) {

    const service = new ProfilePasswordService();
    const controller = new ProfilePasswordController(service);

    const formPasswordInputs = [
      { label: 'Новый пароль', error: '', value: '', type: 'password', name: 'newPassword' },
      { label: 'Подтверждение пароля', error: '', value: '', type: 'password', name: 'confirmPassword' },
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
        submit: (e, data) => {
          controller.updatePassword(data);
        },
      },
    });
    

    super('div', { ...props,
      children: {
        form: formPassword,
      },
    });
  }

  render() {
    return template;
  }
}
