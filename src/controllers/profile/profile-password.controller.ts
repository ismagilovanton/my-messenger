import { ChangePasswordPayload, ProfilePasswordService } from '../../services/profile/profile-password.service';

export class ProfilePasswordController {
  private service: ProfilePasswordService;

  constructor(service: ProfilePasswordService) {
    this.service = service;
  }

  updatePassword(password: ChangePasswordPayload) {
    this.service.updatePassword(password);

  }
}


