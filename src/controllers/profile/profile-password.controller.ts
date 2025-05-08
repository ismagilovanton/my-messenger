import { ProfilePasswordService } from '../../services/profile/profile-password.service';

export class ProfilePasswordController {
  private service: ProfilePasswordService;

  constructor() {
    this.service = new ProfilePasswordService();
  }

  updatePassword(password: Record<string, unknown>) {
    this.service.updatePassword(password);

  }
}



