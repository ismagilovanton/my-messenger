import { AuthAPI } from '../../api/auth.api';
import { SignInRequest, SignUpRequest } from '../../types/auth.types';

export class AuthService {

  private signUpData: SignUpRequest = {
    email: '',
    login: '',
    first_name: '',
    second_name: '',
    phone: '',
    password: '',
    repeat_password: '',
  };

  private signInInData: SignInRequest = {
    login: '',
    password: '',
  };

  private api: AuthAPI;

  constructor() { 
    this.api = new AuthAPI();
  }

  async signUp(newSignUpData: SignUpRequest) {
    this.signUpData = { ...this.signUpData, ...newSignUpData };

    console.log(this.signUpData);

    return this.api.signup(newSignUpData);

  }

  async signIn(newLoginData: SignInRequest) {
    this.signInInData = { ...this.signInInData, ...newLoginData };

    console.log(this.signInInData);

    return this.api.signin(newLoginData);
  }

  async signOut() {
    return this.api.signout();
  }

  async getUser() {

    return this.api.getUser();
  }


}

