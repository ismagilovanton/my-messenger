import { required, login, password, ValidationRule } from '../framework/Validation';

// rules: { [field: string]: ValidationRule[] }
// data: { [field: string]: any }
export function validateLoginFields(
  rules: Record<string, ValidationRule[]>,
  data: Record<string, unknown>,
) {
  const errors: Record<string, string> = {};
  let valid = true;

  for (const field in rules) {
    const value = data[field] ?? '';
    for (const rule of rules[field]) {
      const error = rule(String(value));
      if (error) {
        errors[field] = error;
        valid = false;
        break; // Stop at the first error for this field
      }
    }
  }

  return { valid, errors };
}

export const rulesLogin  = {
  login: [required, login],
  password: [required, password],
};
