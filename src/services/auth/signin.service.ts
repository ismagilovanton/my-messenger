
export interface SignInData {

}

export class SignInService {

  private signInInData: SignInData = {
    login: '',
    password: '',
  };

  signIn(newLoginData: SignInData) {
    this.signInInData = { ...this.signInInData, ...newLoginData };
    console.log(this.signInInData);
  }
}
