const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
} as const;

type Method = typeof METHODS[keyof typeof METHODS];

export interface RequestOptions {
  method?: Method;
  data?: Record<string, unknown> | Document | XMLHttpRequestBodyInit;
  headers?: Record<string, string>;
  timeout?: number;
}

export const API_ENDPOINT = 'https://ya-praktikum.tech/api/v2';
export class HTTPTransport {


  private baseUrl: string;

  constructor(private readonly apiEndpoint?: string) {
    this.baseUrl = `${API_ENDPOINT}${this.apiEndpoint}`;
  }
  
  queryString(data: Record<string, unknown>): string {

    if (
      typeof data !== 'object' ||
      data === null ||
      Array.isArray(data)
    ) {
      throw new Error('Input must be a non-null object');
    }

    function encode(key: string): string {
      // Encode everything except brackets
      return encodeURIComponent(key).replace(/%5B/g, '[').replace(/%5D/g, ']');
    }
  
    function buildParams(obj: unknown, prefix = ''): string[] {
      if (obj === null || obj === undefined) return [];
  
      if (typeof obj === 'object' && !Array.isArray(obj)) {
        return Object.entries(obj).flatMap(([key, value]) =>
          buildParams(value, prefix ? `${prefix}[${key}]` : key),
        );
      }
  
      if (Array.isArray(obj)) {
        return obj.flatMap(val => buildParams(val, `${prefix}[]`));
      }
  
      return [`${encode(prefix)}=${encodeURIComponent(String(obj))}`];
    }
  
    return buildParams(data).join('&');
  }

  private createRequest(method: Method) {
    return (url: string, options: Omit<RequestOptions, 'method'> = {}): Promise<XMLHttpRequest> => {
      
      const fullUrl = this.baseUrl ? `${this.baseUrl}${url}` : url;

      return this.request(fullUrl, { ...options, method });
    };
  }

  get = this.createRequest(METHODS.GET);

  put = this.createRequest(METHODS.PUT);

  post = this.createRequest(METHODS.POST);

  delete = this.createRequest(METHODS.DELETE);

  request(url: string, options: RequestOptions): Promise<XMLHttpRequest> {
    const { method, data, headers = {}, timeout = 5000 } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;
      const isFormData = data instanceof FormData;

      xhr.withCredentials = true;

      xhr.open(method, isGet && data && typeof data === 'object' ? `${url}${this.queryString(data as Record<string, unknown>)}` : url);

      // Устанавливаем базовые заголовки только если это не FormData
      Object.assign(headers, {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'https://ya-praktikum.tech',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      });

      if (!isFormData) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      // Установка пользовательских заголовков
      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
        } else {
          const error = new Error(JSON.parse(xhr.responseText).reason || `Error: ${xhr.status} ${xhr.statusText}`);
          
          // Добавляем статус к объекту ошибки
          (error as any).status = xhr.status;
          
          reject(error);
        }
      };

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


