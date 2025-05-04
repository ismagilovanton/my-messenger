
export interface SignInData {
  login: string,
  password: string
}

export class SignInService {

  private signInInData: SignInData = {
    login: '',
    password: '',
  };

  signIn(newLoginData: Record<string, unknown>) {
    this.signInInData = { ...this.signInInData, ...newLoginData };
    console.log(this.signInInData);
  }
}

