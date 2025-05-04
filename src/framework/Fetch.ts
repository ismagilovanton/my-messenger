const METHODS = {
    GET: "GET",
    PUT: "PUT",
    POST: "POST",
    DELETE: "DELETE",
  };
  
  function queryStringify(data) {
    if (typeof data !== "object") {
      throw new Error("Data must be object");
    }
  
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
      return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
    }, "?");
  }
  
  class HTTPTransport {
    get = (url, options = {}) => {
      return this.request(
        url,
        { ...options, method: METHODS.GET },
        options.timeout
      );
    };
  
    put = (url, options = {}) => {
      return this.request(
        url,
        { ...options, method: METHODS.PUT },
        options.timeout
      );
    };
  
    post = (url, options = {}) => {
      return this.request(
        url,
        { ...options, method: METHODS.POST },
        options.timeout
      );
    };
  
    delete = (url, options = {}) => {
      return this.request(
        url,
        { ...options, method: METHODS.DELETE },
        options.timeout
      );
    };
  
    request = (url, options, timeout = 5000) => {
      const { method, data, headers } = options;
  
      return new Promise((resolve, reject) => {
        if (!method) {
          reject("No method");
          return;
        }
  
        const xhr = new XMLHttpRequest();
        const isGet = method === METHODS.GET;
  
        xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);
  
        if (headers) {
          for (const [key, value] of Object.entries(headers)) {
            xhr.setRequestHeader(key, value);
          }
        }
  
        xhr.onload = function () {
          resolve(xhr);
        };
  
        xhr.onabort = reject;
        xhr.onerror = reject;
  
        xhr.timeout = timeout;
        xhr.ontimeout = reject;
  
        if (isGet || !data) {
          xhr.send();
        } else {
          xhr.send(data);
        }
      });
    };
  }
  