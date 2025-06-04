import { ProfilePasswordService } from '../../services/profile/profile-password.service';
import { UpdatePasswordRequest } from '../../types/user.types';
import { formDataToObject } from '../../utils/formdata.util';

export class ProfilePasswordController {
  private profilePasswordService: ProfilePasswordService;

  constructor() {
    this.profilePasswordService = new ProfilePasswordService();
  }

  async updatePassword(formData: FormData) {
    const data = formDataToObject<UpdatePasswordRequest>(formData);           
    await this.profilePasswordService.updatePassword(data);

  }
}




