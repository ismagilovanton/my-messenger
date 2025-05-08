const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
} as const;

type Method = typeof METHODS[keyof typeof METHODS];

interface RequestOptions {
  method?: Method;
  data?: Record<string, unknown> | Document | XMLHttpRequestBodyInit;
  headers?: Record<string, string>;
  timeout?: number;
}
  
function queryStringify(data: Record<string, unknown>): string {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }
  
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(String(data[key]));
    return `${result}${encodedKey}=${encodedValue}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}
export class HTTPTransport {
  get(url: string, options: Omit<RequestOptions, 'method'> = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.GET });
  }

  put(url: string, options: Omit<RequestOptions, 'method'> = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.PUT });
  }

  post(url: string, options: Omit<RequestOptions, 'method'> = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.POST });
  }

  delete(url: string, options: Omit<RequestOptions, 'method'> = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.DELETE });
  }

  request(url: string, options: RequestOptions): Promise<XMLHttpRequest> {
    const { method, data, headers, timeout = 5000 } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && data && typeof data === 'object' ? `${url}${queryStringify(data as Record<string, unknown>)}` : url);

      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          xhr.setRequestHeader(key, value);
        }
      }

      xhr.onload = () => resolve(xhr);
      xhr.onerror = () => reject(new Error('Network error'));
      xhr.onabort = () => reject(new Error('Request aborted'));
      xhr.ontimeout = () => reject(new Error('Request timeout'));

      xhr.timeout = timeout;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data as Document | XMLHttpRequestBodyInit);
      }
    });
  }
}

