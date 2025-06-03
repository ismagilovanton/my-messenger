import Block from '../../framework/Block';
import { User } from '../../types/user.types';

import template from './profile-avatar.tmpl';
import './profile-avatar.scss';
import { ProfileAvatarController } from '../../controllers/profile/profile-avatar.controller';
import { connect, mapFullUserToProps } from '../../utils/connect.util';
import store from '../../stores/store';

interface ProfileAvatarProps {
  props: {
    user: User
  }
}

class ProfileAvatar extends Block {


  private profileAvatarController: ProfileAvatarController;

  constructor(tagName = 'div', props?: ProfileAvatarProps) {
    console.log(props);
    
    super(tagName, {
      ...props,
      props: {
        user: store.getState().user,
      },
      events: {
        change: (event: Event) => {
          const target = event.currentTarget;
          if (target instanceof HTMLInputElement) {
            const files = target.files;
            
            if (files && files.length > 0) {
              const file = files[0];
              this.profileAvatarController.updateAvatar(file).catch((error) => console.log(error));
            }
          }        
        },
      },
    });

    this.profileAvatarController = new ProfileAvatarController();
  }

  addEvents(): void {
    const avatarInput = this.element?.getElementsByClassName('profile__avatar-input')[0];
    console.log(avatarInput);

    Object.keys(this._events).forEach((eventName) => {
      avatarInput?.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
  
        this._events[eventName](e); 
      });
    });
  }



  override render() {
    return template;
  }
}

export default connect<{ user: User | null }>(mapFullUserToProps)(ProfileAvatar);
