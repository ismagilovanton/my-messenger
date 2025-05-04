
export interface ChangeProfilePayload {
  email: string
  login: string
  first_name: string
  second_name: string
  display_name: string
  phone: string
  oldPassword: string
  newPassword: string
}

export class ProfileDataService {
  private profileData: ChangeProfilePayload = {
    email: 'ivan@example.com',
    login: 'ivanivanov',
    first_name: 'Иван',
    second_name: 'Иванов',
    display_name: 'Иван',
    phone: '89991234567',
    oldPassword: '12345678Aa!',
    newPassword: '12345678Aa!',
  };

  getProfile(): ChangeProfilePayload {
    return this.profileData;
  }

  updateProfile(profile: ChangeProfilePayload): void {
    this.profileData = { ...this.profileData, ...profile };
    console.log(this.profileData);
  }
}
