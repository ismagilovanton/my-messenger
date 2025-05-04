

export interface SignUpData {
  email: string,
  login: string,
  first_name: string,
  second_name: string,
  phone: string,
  password: string,
  repeat_password: string,
}

export class SignUpService {

  private signUpData: SignUpData = {
    email: '',
    login: '',
    first_name: '',
    second_name: '',
    phone: '',
    password: '',
    repeat_password: '',
  };

  signUp(newSignUpData: SignUpData) {
    this.signUpData = { ...this.signUpData, ...newSignUpData };
    console.log(this.signUpData);
  }
}
