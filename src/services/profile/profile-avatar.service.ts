import { UserAPI } from '../../api/user.api';

export class ProfileAvatarService {
  
  
  private api: UserAPI;

  constructor() {
    this.api = new UserAPI();
  }


  async updateAvatar(payload: File) {
    const user = await this.api.updateAvatar(payload);
    return user;    
  }
}

