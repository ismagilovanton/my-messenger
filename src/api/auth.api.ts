import { HTTPTransport } from '../framework/Fetch';
import { SignInRequest, SignUpRequest, SignUpResponse } from '../types/auth.types';
import { User } from '../types/user.types';
import { BaseAPI } from './base.api';

export class AuthAPI extends BaseAPI {

  constructor() {
    super(new HTTPTransport('/auth'));
  }

  async signin(payload: SignInRequest): Promise<any> {
    const data = await this.apiInstance.post('/signin', {
      data: JSON.stringify(payload),
    
    });

    return data.response;
  }

  async signup(payload: SignUpRequest): Promise<SignUpResponse> {
    const data = await this.apiInstance.post('/signup', {
      data: JSON.stringify(payload),
    
    });

    return JSON.parse(data.response);
  }

  async signout(): Promise<void> {
    await this.apiInstance.post('/logout');
  }

  async getUser(): Promise<User> {
    const data = await this.apiInstance.get('/user');

    return JSON.parse(data.response);
  }

}

