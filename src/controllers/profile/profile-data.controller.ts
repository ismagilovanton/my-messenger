
import { AuthService } from '../../services/auth/auth.service';
import { ProfileDataService } from '../../services/profile/profile-data.service';
import store from '../../stores/store';
import { UpdateProfileRequest } from '../../types/user.types';
import { formDataToObject } from '../../utils/formdata.util';

export class ProfileDataController {
  private profileDataService: ProfileDataService;

  private authService: AuthService;

  constructor() {
    this.profileDataService = new ProfileDataService();
    this.authService = new AuthService();
  }
  
  async loadProfile() {
    const user = await this.authService.getUser();
    store.set('user', user);
    console.log(user);
    return user;
  }
  
  async updateProfile(payload: FormData) {
    const data = formDataToObject<UpdateProfileRequest>(payload);       
    const updatedUser = await this.profileDataService.updateProfile(data);

    store.set('user', updatedUser);

    console.log(updatedUser);

  }
}


