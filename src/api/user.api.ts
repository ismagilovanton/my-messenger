import { HTTPTransport } from '../framework/Fetch';
import { UpdatePasswordRequest, UpdateProfileRequest } from '../types/user.types';
import { BaseAPI } from './base.api';

const API_ENDPOINT = 'https://ya-praktikum.tech/api/v2';

export class UserAPI extends BaseAPI {
  constructor() {
    super(new HTTPTransport(`${API_ENDPOINT}/user`));
  }


  async updateProfile(payload: UpdateProfileRequest) {
    const data = await this.apiInstance.put('/profile', {
      data: JSON.stringify(payload),
    });

    return JSON.parse(data.response);
  }

  async searchUser(payload: { login: string }) {
    const data = await this.apiInstance.post('/search', {
      data: JSON.stringify(payload),
    });

    return JSON.parse(data.response);
  }

  async updatePassword(payload: UpdatePasswordRequest) {
    const data = await this.apiInstance.put('/password', {
      data: JSON.stringify(payload),
    });

    return data.response;
  }

  async updateAvatar(file: File) {

    const formData = new FormData();

    // Важно! Проверяем, что файл существует
    if (!file) {
      throw new Error('Файл не выбран');
    }

    console.log(file);
    

    formData.append('avatar', file);

    const data = await this.apiInstance.put('/profile/avatar', {
      data: formData,
    });

    return JSON.parse(data.response);
  }

}

