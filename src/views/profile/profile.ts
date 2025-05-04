import Block from '../../framework/Block';
import template from './profile.tmpl';
import { Button } from '../../components/Button/button.ts';
import { ProfileData } from '../../modules/profile-data/profile-data.ts';
import './profile.scss';
import { ProfilePassword } from '../../modules/profile-password/profile-password.ts';


interface ProfileViewProps {
  children?: {
    form: Block
  }
}

export class ProfileView extends Block {
  constructor(props?: ProfileViewProps) {

    const profileData = new ProfileData({});
    const profilePassword = new ProfilePassword({});

    const changeData = new Button({
      props: {
        text: 'Изменить данные',
      },
      attributes: {
        class: 'button-inline',
        name: 'changeData',
        id: 'change-data',
        type: 'button',
      },
    });
  
    const changePassword = new Button({
      props: {
        text: 'Изменить пароль',
      },
      attributes: {
        class: 'button-inline',
        name: 'changePassword',
        id: 'change-password',
        type: 'button',
      },
    });

    super('div', {
      ...props,
      children: {
        form: profileData,
        changeData,
        changePassword,
      },
    });
  }

  override render(): string {
    return template;
  }
}
