import { ProfileAvatarService } from '../../services/profile/profile-avatar.service';
import store from '../../stores/store';

export class ProfileAvatarController {


  private profileAvatarService: ProfileAvatarService;

  constructor() {
    this.profileAvatarService = new ProfileAvatarService();
  }



  async updateAvatar(payload: FormData) {
    const updatedUser = await this.profileAvatarService.updateAvatar(payload);
    console.log(updatedUser);

    const state = store.getState();
    console.log(state);
    store.set('user', updatedUser);
    
    
  }

}
