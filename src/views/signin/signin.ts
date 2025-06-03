import { AuthController } from '../../controllers/auth/auth.controller.ts';
import Block from '../../framework/Block';
import { login, password, required } from '../../framework/Validation.ts';
import { InputComponent } from '../../components/Input/input.ts';
import { Form } from '../../components/Form/form.ts';
import { Button } from '../../components/Button/button';
import template from './signin.tmpl';
import { connect, mapFullUserToProps } from '../../utils/connect.util.ts';
import { User } from '../../types/user.types.ts';

interface SignInProps {
  children?: {
    form: Form
  }
}
export class SignInView extends Block {
  private controller: AuthController;

  constructor(tagName = 'div', props?: SignInProps) {
    
    super(tagName, {
      ...props,
    });

    this.controller = new AuthController(this);

    const formInputs = [
      { 
        label: 'Логин',
        error: '', 
        value: 'ivanovivan', 
        type: 'text', 
        name: 'login', 
        placeholder: 'Введите логин',
        validationRules: [login],
      },
      { 
        label: 'Пароль',
        error: '',
        value: '12345678',
        type: 'password',
        name: 'password',
        placeholder: 'Введите пароль',
        validationRules: [required, password],
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
        submit:  (e) => {
          const target = e.currentTarget;
          if (target instanceof HTMLFormElement) {
            const formData = new FormData(target);
            this.controller.signIn(formData).catch((error) => console.log(error));
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


export default connect<{ user: User }>(mapFullUserToProps)(SignInView);
