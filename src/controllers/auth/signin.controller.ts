import { SignInService } from '../../services/auth/signin.service';

export class SignInController {
  private service: SignInService;

  constructor() {
    this.service = new SignInService();
  }

  signIn(loginData: Record<string, unknown>) {
    this.service.signIn(loginData);
  }

}

