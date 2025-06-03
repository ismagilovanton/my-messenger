import Block from '../../framework/Block';
import template from './profile.tmpl';
import { Button } from '../../components/Button/button.ts';
import ProfileData from '../../modules/profile-data/profile-data.ts';
import './profile.scss';

import { connect, mapFullUserToProps } from '../../utils/connect.util';
import { AuthController } from '../../controllers/auth/auth.controller.ts';
import { ProfilePassword } from '../../modules/profile-password/profile-password.ts';
import { User } from '../../types/user.types.ts';
import store from '../../stores/store.ts';
import ProfileAvatar from '../../modules/profile-avatar/profile-avatar.ts';

interface ProfileViewProps {
  children?: {
    form: Block,
    changeData: Block,
    changePassword: Block,
    button: Block
  },
  props: {
    user?: User | null
  }
}

class ProfileView extends Block {

  private authController: AuthController;

  constructor(tagName = 'div', props?: ProfileViewProps) {

    const state = store.getState();
    
    const user = state.user;


    const profilePassword = new ProfilePassword();

    const button = new Button({
      props: {
        text: 'Выйти',
      },
      attributes: {
        class: 'button-inline danger ',
        name: 'save',
        id: 'save',
      },
      events: {
        click: (e: Event) => {
          e.preventDefault();
          const target = e.target as HTMLButtonElement;
          if (target instanceof HTMLButtonElement) {
            this.authController.signOut().catch((error) => console.log(error));
          }
        },
      },
    });

    const changeData = new Button({
      props: {
        text: 'Изменить данные',
      },
      attributes: {
        class: 'button-inline profile__actions--item list__item',
        name: 'changeData',
        id: 'change-data',
        type: 'button',
      },
      events: {
        click: () => {
          console.log('Show data');
          this.setChildren({
            form: new ProfileData(),
          });
        },
      },
    });
  
    const changePassword = new Button({
      props: {
        text: 'Изменить пароль',
      },
      attributes: {
        class: 'button-inline profile__actions--item list__item',
        name: 'changePassword',
        id: 'change-password',
        type: 'button',
      },
      events: {
        click: () => {
          console.log('Show password');
          this.setChildren({
            form: profilePassword,
          });
        },
      },
    });

    const profileData = new ProfileData();

    const profileAvatar = new ProfileAvatar();

    super(tagName, {
      ...props, 
      props: {
        user,
      },
      children: {
        profileAvatar,
        form: profileData,
        changeData,
        changePassword,
        button,
      },
      
    });


    this.authController = new AuthController(this);
  }

  override render(): string {
    return template;
  }
}

export default connect<{ user: User | null }>(mapFullUserToProps)(ProfileView);

