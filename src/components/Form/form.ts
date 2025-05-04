import Block from '../../framework/Block';
import template from './form.tmpl';
import { InputComponent } from '../Input/input';

interface FormProps {
  attributes: {
    class: string,
    action: string
  },
  children: {   
    header: Block,
    submit: Block,
    footer: Block
  },
  items: {
    inputs: Array<Block>
  }
  events: {
    submit: (e: Event, data: Record<string, string>) => void
  }
}

export class Form extends Block {
  constructor(props: FormProps) {
    super('form', { ...props });
    this._onSubmit = this._onSubmit.bind(this);
  }

  private _onSubmit(e: Event) {
    e.preventDefault();
  
    const { inputs } = this._items; // Use this.props instead of this._props
    
    let isFormValid = true;
    const formData: Record<string, string> = {};
  
    // Validate each input
    inputs.forEach((input: InputComponent) => {
      if (typeof input.validate === 'function') {
        const isValid = input.validate();
        if (!isValid) {
          isFormValid = false;
        }
      }
      // Collect form data
      const inputElement = input.element?.getElementsByClassName('field')[0];      
      formData[inputElement.name] = inputElement.value;
    });
  
    // If the form is valid, trigger the submit event
    if (isFormValid && this._events.submit) {
      this._events.submit(e, formData);
    }
  }

  override addEvents() {
    // super.addEvents();
    this.element?.addEventListener('submit', this._onSubmit.bind(this));
  }

  override render() {
    return template;
  }
}
