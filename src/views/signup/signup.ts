import { AuthController } from '../../controllers/auth/auth.controller.ts';
import Block from '../../framework/Block';
import { Button } from '../../components/Button/button.ts';
import { InputComponent } from '../../components/Input/input.ts';
import { Form } from '../../components/Form/form.ts';
import { email, login, name, password, phone } from '../../framework/Validation.ts';

import template from './signup.tmpl';
import { connect, mapUserToProps } from '../../utils/connect.util.ts';

interface SignUpProps {
  children?: {
    form: Form
  },
  props: {
    error: string
  }
}

export class SignUpView extends Block {

  private controller: AuthController;

  constructor(tagName = 'div', props?: SignUpProps) {
    super(tagName, {
      ...props,
    });

    this.controller = new AuthController(this);

    const formInputs = [
      {
        label: 'Почта', error: '', value: 'pochta@yandex.ru', type: 'email', name: 'email',
        validationRules: [email],
      },
      { 
        label: 'Логин', error: '', value: 'ivanivanov', type: 'text', name: 'login',
        validationRules: [login],
      },
      { 
        label: 'Имя', error: '', value: 'Иван', type: 'text', name: 'first_name',
        validationRules: [name],
      },
      { 
        label: 'Фамилия', error: '', value: 'Иванов', type: 'text', name: 'second_name',
        validationRules: [name],
      },
      { 
        label: 'Телефон', error: '', value: '89832044869', type: 'phone', name: 'phone',
        validationRules: [phone],
      },
      { 
        label: 'Пароль', error: '', value: '12345678Aa!', type: 'password', name: 'password',
        validationRules: [password],
      },
      { 
        label: 'Пароль еще раз', error: '', value: '12345678Aa!', type: 'password', name: 'repeat_password',
        validationRules: [password],
      },
    ];
    
    const inputs = formInputs.map(el=> {
      return new InputComponent({
        attributes: {  class: 'input-form' },
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
        text: 'Войти',
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
        inputs,
      },
      events: {
        submit: (e) => {
          const target = e.currentTarget;
          if (target instanceof HTMLFormElement) {
            const formData = new FormData(target);
            this.controller.signUp(formData).catch((error) => console.log(error));
          }
        },
      },
    });

    this.setChildren({
      form,
    });
  }

  override render() {
    return template;
  }
}

export default connect<{ name: string }>(mapUserToProps)(SignUpView);
