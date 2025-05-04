import { SignUpData, SignUpService } from '../../services/auth/signup.service';
import { SignUpView } from '../../views/signup/signup';

export class SignUpController {
  private service: SignUpService;

  private view: SignUpView;

  constructor(
    view: SignUpView,
  ) {
    this.service = new SignUpService();
    this.view = view;
  }

  signUp(signUpData: SignUpData) {
    this.service.signUp(signUpData);
  }

}
