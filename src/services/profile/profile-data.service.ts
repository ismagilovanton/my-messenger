import { UserAPI } from '../../api/user.api';
import { UpdateProfileRequest } from '../../types/user.types';



export class ProfileDataService {

  private api: UserAPI;

  constructor() { 
    this.api = new UserAPI();
  }


  async updateProfile(profile: UpdateProfileRequest) {
    const updatedUser = await this.api.updateProfile(profile);

    return updatedUser;
    
  }
}


