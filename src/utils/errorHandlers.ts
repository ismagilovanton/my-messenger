export const defaultErrorHandler = (error: Error): void => {
  console.error('Произошла ошибка:', error.message);
};

export const authErrorHandler = (error: Error): void => {
  console.error('Ошибка аутентификации:', error.message);
};

