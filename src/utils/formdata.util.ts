export function formDataToObject<T>(formData: FormData): T {
  const obj: Record<string, string | string[]> = {};

  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string') {
      if (obj.hasOwnProperty(key)) {
        if (Array.isArray(obj[key])) {
          (obj[key]).push(value);
        } else {
          obj[key] = [obj[key], value];
        }
      } else {
        obj[key] = value;
      }
    }
  }

  return obj as T;
}


