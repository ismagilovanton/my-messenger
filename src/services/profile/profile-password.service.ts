import { UserAPI } from '../../api/user.api';
import { UpdatePasswordRequest } from '../../types/user.types';



export class ProfilePasswordService {

  private api: UserAPI;

  constructor() {
    this.api = new UserAPI();
  }

  async updatePassword(payload: UpdatePasswordRequest) {
    console.log(payload);
    const data = await this.api.updatePassword(payload);
    return data;
  }
}


