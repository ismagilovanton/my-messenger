// chat-api.js
import { BaseAPI } from './base.api';
import { HTTPTransport } from '../framework/Fetch';
import { CreateChatRequest, CreateChatResponse } from '../types/chat.types';


const API_ENDPOINT = 'https://ya-praktikum.tech/api/v2';

export class ChatAPI extends BaseAPI {

  constructor() {
    super(new HTTPTransport(`${API_ENDPOINT}/chats`));
  }

  async getChats() {
    const data = await this.apiInstance.get('');
    return JSON.parse(data.response);
  }

  async createChat(payload: CreateChatRequest): Promise<CreateChatResponse> {
    const data =  await this.apiInstance.post('', {
      data: JSON.stringify(payload),
    });

    return JSON.parse(data.response);
  }

  async removeChat(payload: { chatId: number }) {
    const data = await this.apiInstance.delete('/', {
      data: JSON.stringify(payload),
    });
    return JSON.parse(data.response);
  }

  async getChatById(id: number) {
    const data = await this.apiInstance.get(`/${id}/common`);
    return JSON.parse(data.response);
  }

  async getChatUsers(id: number) {
    const data = await this.apiInstance.get(`/${id}/users`);
    return JSON.parse(data.response);
  }


  async addUserToChat(payload: { chatId: number, users: Array<number> }) {
    const data = await this.apiInstance.put('/users', {
      data: JSON.stringify(payload),
    });

    return data.response;
  }

  async removeUserFromChat(payload: { chatId: number, users: Array<number> }) {
    const data = await this.apiInstance.delete('/users', {
      data: JSON.stringify(payload),
    });

    return data.response;
  }

  async getChatToken(payload: { id: number }) {
    const data = await this.apiInstance.post(`/token/${payload.id}`);

    return JSON.parse(data.response);
  }
  
}
