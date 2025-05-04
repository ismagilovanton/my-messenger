
export interface ChangePasswordPayload {
  oldPassword: string
  newPassword: string 
}

export class ProfilePasswordService {
  updatePassword(payload: Record<string, unknown>): void {
    console.log(payload);
  }
}
