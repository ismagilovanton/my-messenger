import { ProfileDataService } from '../../services/profile/profile-data.service';
import { UpdateProfileRequest } from '../../types/user.types';

export class ProfileController {
  private profileDataService: ProfileDataService;


  constructor() {
    this.profileDataService = new ProfileDataService();
  }

  async updateProfile(profile: UpdateProfileRequest) {
    await this.profileDataService.updateProfile(profile);
  }
}


