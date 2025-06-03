import { UserAPI } from '../api/user.api';



export class UserService {
  private api: UserAPI;


  constructor() {
    this.api = new UserAPI();
  }

  async searchUser(payload: { login: string }) {
    const data = await this.api.searchUser(payload);
    return data;

  }
}

