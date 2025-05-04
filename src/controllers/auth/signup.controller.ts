import { SignUpService } from '../../services/auth/signup.service';

export class SignUpController {
  private service: SignUpService;

  constructor() {
    this.service = new SignUpService();
  }

  signUp(signUpData: Record<string, unknown>) {
    this.service.signUp(signUpData);
  }

}
