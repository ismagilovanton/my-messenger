import { HTTPTransport } from '../framework/Fetch';

export class BaseAPI {

  public apiInstance: HTTPTransport;

  constructor(apiInstance: HTTPTransport) {
    this.apiInstance = apiInstance;
  }

  create() { throw new Error('Not implemented'); }

  request() { throw new Error('Not implemented'); }

  update() { throw new Error('Not implemented'); }

  delete() { throw new Error('Not implemented'); }
}
