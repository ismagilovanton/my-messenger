import { SignInController } from '../../controllers/auth/signin.controller';
import Block from '../../framework/Block';
import { login, password, required } from '../../framework/Validation.ts';
import { InputComponent } from '../../components/Input/input.ts';
import { Form } from '../../components/Form/form.ts';
import { Button } from '../../components/Button/button';
import template from './signin.tmpl';
import { formDataToObject } from '../../utils/formdata.util.ts';

interface SignInProps {
  children?: {
    form: Form
  }
}
export class SignInView extends Block {
  private controller: SignInController;

  constructor(props: SignInProps) {
    
    super('div', props);

    this.controller = new SignInController();

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
        submit: (e) => {
          const target = e.currentTarget as HTMLFormElement | null;
          if (target) {
            const formData = new FormData(target);
            const data = formDataToObject(formData);            
            this.controller.signIn(data);
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

