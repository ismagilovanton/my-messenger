import Block from '../../framework/Block';
import template from './input.tmpl';
import './input.scss';
import { ValidationRule } from '../../framework/Validation';


interface InputComponentProps {
  attributes: {
    class: string,
  };
  props: {
    type: string,
    placeholder?: string,
    value?: string,
    name?: string,
    required?: string,
    label?: string,
    error?: string
    validationRules?: ValidationRule[],
  }
}

export class InputComponent extends Block {

  private _errors: string[] = [];

  constructor(props: InputComponentProps) {
    super('div', { ...props });
  }

  override render(): string {
    return template;
  }

  public validate(): boolean {
    const input = this.element?.getElementsByClassName('field')[0];
    return this._validate(input?.value as string);
  }

  private _validate(value: string): boolean {
    const { validationRules = [] } = this._props;
    
    this._errors = validationRules
      .map((rule: ValidationRule) => rule(value))
      .filter((error) => error !== null);

    const isValid = this._errors.length === 0;

    this.setProps({
      error: this._errors[0],
      value: value,
    });
    
    return isValid;
  }

  addEvents(): void {
    const { events } = this._events;
    const input = this.element?.getElementsByClassName('field')[0];
    
    input?.addEventListener('blur', (e: Event)=> {
      
      const value = (e.target as HTMLInputElement).value;
      this._validate(value);

      if (events?.blur) {
        events.blur(e);
      }
    });
  }
}
