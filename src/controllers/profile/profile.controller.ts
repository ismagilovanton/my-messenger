import { ProfileService } from '../../services/profile/profile-data.service';
import { ProfileView } from '../../views/profile/profile';

export class ProfileController {
  private service: ProfileService;

  private view: ProfileView;

  constructor(
    service: ProfileService,
    view: ProfileView,
  ) {
    this.service = service;
    this.view = view;
  }

  loadProfile() {
    return this.service.getProfile();
  }

  updateProfile(profile: Record<string, any>) {
    this.service.updateProfile(profile);
  }
}
