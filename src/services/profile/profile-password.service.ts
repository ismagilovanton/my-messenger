
export interface ChangePasswordPayload {
  oldPassword: string
  newPassword: string 
}

export class ProfilePasswordService {
  updatePassword(payload: ChangePasswordPayload): void {
    console.log(payload);
  }
}
