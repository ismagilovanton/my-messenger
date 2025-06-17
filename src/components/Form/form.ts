import Block from '../../framework/Block';
import template from './form.tmpl';
import { InputComponent } from '../Input/input';

interface FormProps {
  attributes: {
    class: string,
    action: string
  },
  children: {   
    header?: Block,
    submit: Block,
    footer?: Block
  },
  items: {
    inputs: Array<InputComponent>
  }
  events: {
    submit: (e: Event) => void
  }
}

export class Form extends Block {
  constructor(props: FormProps) {
    super('form', { ...props });
    this._onSubmit = this._onSubmit.bind(this);
  }

  private _onSubmit(e: Event) {
    e.preventDefault();
  
    const { inputs } = this._items; 
    
    let isFormValid = true;
  
    // Validate each input
    inputs.forEach((input) => {
      const inputComponent = input as InputComponent;
      if (typeof inputComponent.validate === 'function') {
        const isValid = inputComponent.validate();
        if (!isValid) {
          isFormValid = false;
        }
      }
    });
  
    // If the form is valid, trigger the submit event
    if (isFormValid && this._events.submit) {
      this._events.submit(e);
    }
  }

  override addEvents() {
    this.element?.addEventListener('submit', this._onSubmit.bind(this));
  }

  override render() {
    return template;
  }
}


