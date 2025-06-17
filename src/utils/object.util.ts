type Indexed<T = unknown> = {
  [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  Object.keys(rhs).forEach((key) => {
    if (key in lhs) {
      if (
        typeof lhs[key] === 'object' && lhs[key] !== null &&
                typeof rhs[key] === 'object' && rhs[key] !== null
      ) {
        merge(lhs[key] as Indexed, rhs[key] as Indexed);
      } else {
        lhs[key] = rhs[key];
      }
    } else {
      lhs[key] = rhs[key];
    }
  },
  );
  return lhs;
}

export function set(object: Indexed, path: string, value: unknown): Indexed {

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  if (typeof object !== 'object' || object === null) {
    return object;
  }

  const keys = path.split('.');
  let current: any = object;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (i === keys.length - 1) {
      current[key] = value;
    } else {
      if (typeof current[key] !== 'object' || current[key] === null) {
        current[key] = {};
      }
      current = current[key];
    }
  }

  return object;
}


export type PlainObject<T = unknown> = {
  [k in string]: T;
};

export function isArray(value: unknown): value is [] {
  return Array.isArray(value);
} 

export function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
} 

export function isArrayOrObject(value: unknown): value is ([] | PlainObject) {
  return isPlainObject(value) || isArray(value);
}   

export function isEqual(lhs: PlainObject | unknown[], rhs: PlainObject | unknown[]): boolean {
  if (Array.isArray(lhs) && Array.isArray(rhs)) {
    if (lhs.length !== rhs.length) {
      return false;
    }
    for (let i = 0; i < lhs.length; i++) {
      if (isArrayOrObject(lhs[i]) && isArrayOrObject(rhs[i])) {
        if (!isEqual(lhs[i] as PlainObject | unknown[], rhs[i] as PlainObject | unknown[])) {
          return false;
        }
      } else if (lhs[i] !== rhs[i]) {
        return false;
      }
    }
    return true;
  }

  if (isPlainObject(lhs) && isPlainObject(rhs)) {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
      return false;
    }

    for (const [key, value] of Object.entries(lhs)) {
      const rightValue = (rhs)[key];
      if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
        if (!isEqual(value, rightValue)) {
          return false;
        }
      } else if (value !== rightValue) {
        return false;
      }
    }

    return true;
  }

  return lhs === rhs;
}

export function cloneDeep<T extends object = object>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => cloneDeep(item)) as unknown as T;
  }

  const result: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = cloneDeep((obj as any)[key]);
    }
  }

  return result;
}


export function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}

export function getParams(data: PlainObject | [], parentKey?: string) {
  const result: [string, string][] = [];

  for (const [key, value] of Object.entries(data)) {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)));
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
    }
  }

  return result;
}

