import { SignUpController } from '../../controllers/auth/signup.controller';
import Block from '../../framework/Block';
import { Button } from '../../components/Button/button.ts';
import { InputComponent } from '../../components/Input/input.ts';
import { Form } from '../../components/Form/form.ts';
import { email, login, name, password, phone } from '../../framework/Validation.ts';

import template from './signup.tmpl';

interface SignUpProps {
  children: {
    form: Form
  }
}

export class SignUpView extends Block {

  private controller: SignUpController;

  constructor(props?: SignUpProps) {
    super('div', {
      ...props,
    });

    this.controller = new SignUpController(this);

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
        label: 'Телефон', error: '', value: '+7 (909) 967 30 30', type: 'phone', name: 'phone',
        validationRules: [phone],
      },
      { 
        label: 'Пароль', error: '', value: '12345678', type: 'password', name: 'password',
        validationRules: [password],
      },
      { 
        label: 'Пароль еще раз', error: '', value: '12345678', type: 'password', name: 'repeat_password',
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
        submit: (e, data) => {
          this.controller.signUp(data);
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
