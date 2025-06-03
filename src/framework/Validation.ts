export type ValidationRule = (value: string) => string | null;

export const name: ValidationRule = (value) => {
  if (!value) {
    return 'Поле обязательно для заполнения';
  }
    
  if (!/^[А-ЯЁA-Z]/.test(value)) {
    return 'Имя должно начинаться с заглавной буквы';
  }
    
  if (/[^а-яёА-ЯЁa-zA-Z-]/.test(value)) {
    return 'Имя может содержать только буквы и дефис';
  }
    
  if (/\s/.test(value)) {
    return 'Имя не должно содержать пробелы';
  }
    
  if (/\d/.test(value)) {
    return 'Имя не должно содержать цифры';
  }
    
  return null;
};

export const login: ValidationRule = (value) => {
  if (value.length < 3 || value.length > 20) {
    return 'Логин должен быть от 3 до 20 символов';
  }
    
  if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
    return 'Логин может содержать только латиницу, цифры, "-", "_"';
  }
    
  if (!/[a-zA-Z]/.test(value)) {
    return 'Логин не может состоять только из цифр';
  }
    
  if (/\s/.test(value)) {
    return 'Логин не должен содержать пробелы';
  }
  return null;
};

export const required: ValidationRule = (value) =>{
  return value.trim().length > 0 ? null : 'Это поле обязательно';
};

export const minLength = (min: number): ValidationRule => (value) =>{
  return value.length >= min ? null : `Минимальная длина ${min} символов`;
};

export const maxLength = (max: number): ValidationRule => (value) =>{
  return value.length <= max ? null : `Максимальная длина ${max} символов`;
};

export const email: ValidationRule = (value) =>{
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value) ? null : 'Некорректный email';
};

export const phone: ValidationRule = (value) => {
  const regex = /^[+]?[0-9]{10,15}$/;
  return regex.test(value) ? null : 'Некорректный номер телефона';
};

export const password: ValidationRule = (value) => {
  if (!value) {
    return 'Пароль обязателен';
  }
    
  if (value.length < 8 || value.length > 40) {
    return 'Пароль должен быть от 8 до 40 символов';
  }
    
  if (!/[A-Z]/.test(value)) {
    return 'Пароль должен содержать хотя бы одну заглавную букву';
  }
    
  if (!/\d/.test(value)) {
    return 'Пароль должен содержать хотя бы одну цифру';
  }
    
  return null;
};
