
import { ProfileDataService } from '../../services/profile/profile-data.service';

export class ProfileDataController {
  private service: ProfileDataService;
  
  constructor() {
    this.service = new ProfileDataService();
  }
  
  loadProfile() {
    return this.service.getProfile();
  }
  
  updateProfile(profile: Record<string, unknown>) {
    this.service.updateProfile(profile);
  }
}

