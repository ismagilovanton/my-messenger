import Block from '../../framework/Block';
import template from './input.tmpl';
import './input.scss';
import { ValidationRule } from '../../framework/Validation';


interface Props { 
  [key: string]: unknown;
  type: string;
  placeholder?: string;
  value?: string;
  name?: string;
  required?: string;
  label?: string;
  error?: string;
  validationRules?: ValidationRule[];
}

interface InputComponentProps {
  attributes: {
    class: string;
  };
  props: Props;
  events?: {
    blur?: (e: Event) => void;
  };
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
    const input = this.element?.querySelector<HTMLInputElement>('.field');
    return this._validate(input?.value || '');
  }

  private _validate(value: string): boolean {
    
    const { validationRules = [] } = (this._props as Props);

    this._errors = validationRules
      .map((rule: ValidationRule) => rule(value))
      .filter((error: string | null): error is string => error !== null);

    const isValid = this._errors.length === 0;

    this.setProps({
      error: this._errors[0],
      value: value,
    });

    return isValid;
  }

  addEvents(): void {
    const { events } = this._events as InputComponentProps;
    const input = this.element?.querySelector<HTMLInputElement>('.field');

    input?.addEventListener('blur', (e: Event) => {
      const value = (e.target as HTMLInputElement).value;
      this._validate(value);

      if (events?.blur) {
        events.blur(e);
      }
    });
  }
}

