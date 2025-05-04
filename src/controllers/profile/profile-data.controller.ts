
import { ChangeProfilePayload, ProfileDataService } from '../../services/profile/profile-data.service';

export class ProfileDataController {
  private service: ProfileDataService;
  
  constructor(service: ProfileDataService) {
    this.service = service;
  }
  
  loadProfile() {
    return this.service.getProfile();
  }
  
  updateProfile(profile: ChangeProfilePayload) {
    this.service.updateProfile(profile);
  }
}
