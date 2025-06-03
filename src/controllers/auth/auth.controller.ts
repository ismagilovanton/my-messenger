import { AuthService } from '../../services/auth/auth.service';
import store from '../../stores/store';
import router from '../../router';
import type { SignInRequest, SignUpRequest } from '../../types/auth.types';
// import { handleError } from '../../decorators/error.decorator';
// import { authErrorHandler } from '../../utils/errorHandlers';
import Block from '../../framework/Block';
import { formDataToObject } from '../../utils/formdata.util';

export class AuthController {
  private authService: AuthService;

  private view: Block; // Declare view as a Block or null

  constructor(view: Block) {
    this.authService = new AuthService();
    this.view = view; // Initialize view to null
  }

  // @handleError(authErrorHandler)
  async signUp(data: FormData) {
    try {
      this.view.setProps({
        error: null,
      });
      const signUpData = formDataToObject<SignUpRequest>(data);  
      
      const { id } = await this.authService.signUp(signUpData);
      console.log(`User with id ${id} created successfully`);
      const user = await this.authService.getUser();
      store.set('user', user);
      await router.go('/messenger');
    } catch (error: any) {
      this.view.setProps({ error: error.message || 'Ошибка при входе' });
    }
   
  }

  // @validate(rulesSignIn)
  // @handleError(authErrorHandler)
  async signIn(data: FormData) {
    try {
      this.view.setProps({
        error: null,
      });
      const signInData = formDataToObject<SignInRequest>(data);  
      const response = await this.authService.signIn(signInData);
      console.log(response);
      const user = await this.authService.getUser();
      store.set('user', user);
      await router.go('/messenger');
    } catch (error: any) {
      this.view.setProps({ error: error.message || 'Ошибка при регистрации' });
    }
  }


  async signOut() {
    try {
      await this.authService.signOut();
      store.set('user', null);
      await router.go('/');
    } catch (error) {
      console.log('CONTROLLER', error);
    }
  }

  async getUser() {
    try {
      const user = await this.authService.getUser();
      store.set('user', user);
    } catch (error) {
      console.log('CONTROLLER', error);
    }
  }
}



