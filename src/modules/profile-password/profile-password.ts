import Block from '../../framework/Block';

import { Button } from '../../components/Button/button';
import { InputComponent } from '../../components/Input/input';
import { Form } from '../../components/Form/form';

import template from './profile-password.tmpl';
import { ProfilePasswordController } from '../../controllers/profile/profile-password.controller';
import { formDataToObject } from '../../utils/formdata.util';

interface ProfilePasswordProps { 
  children: {
    form: Form;
  };
}

export class ProfilePassword extends Block {
  constructor(props: ProfilePasswordProps) {

    const controller = new ProfilePasswordController();

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
        submit: (e) => {
          const target = e.currentTarget as HTMLFormElement | null;
          if (target) {
            const formData = new FormData(target);
            const data = formDataToObject(formData);           
            controller.updatePassword(data);
          }
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
