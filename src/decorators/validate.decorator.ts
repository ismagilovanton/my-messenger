import { login, password, required, ValidationRule } from '../framework/Validation';

export interface FieldValidation {
  field: string;
  rules: ValidationRule[];
}

export function validate(validations: FieldValidation[]) {
  return function (
    // target: any,
    // propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const data = args[0];

      for (const validation of validations) {
        const value = data[validation.field];

        for (const rule of validation.rules) {
          console.log(value);
          
          const error = rule(value);
          if (error) {
            throw new Error(`${validation.field}: ${error}`);
          }
        }
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

export const rulesSignIn = [
  {
    field: 'login',
    rules: [required, login],
  },
  {
    field: 'password',
    rules: [required, password],
  },
];

