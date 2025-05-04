import { SignInData, SignInService } from '../../services/auth/signin.service';
import { SignInView } from '../../views/signin/signin';

export class SignInController {
  private service: SignInService;

  private view: SignInView;

  constructor(
    view: SignInView,
  ) {
    this.service = new SignInService();
    this.view = view;
  }

  signIn(loginData: SignInData) {
    this.service.signIn(loginData);
  }

}
