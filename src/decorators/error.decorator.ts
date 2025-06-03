export type ErrorHandler = (error: Error) => void;

export function handleError(handler: ErrorHandler) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        if (error instanceof Error) {
          handler(error);
        } else {
          handler(new Error(String(error)));
        }
      }
    };

    return descriptor;
  };
}
