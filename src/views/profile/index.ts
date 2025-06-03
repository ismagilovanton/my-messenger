
import '../../static/index.ts';

import './profile.scss';

import { SettingsLayout } from '../../layouts/settings/settings.ts';
import ProfileView from './profile.ts';
import Block from '../../framework/Block.ts';


export class ProfilePage extends Block {
  constructor() {
    super('div');

    const body = new ProfileView('div');

    const layout = new SettingsLayout({
      props: {
        title: 'Профиль',
      },
      children: {
        body,
      },
    });

    this.setChildren({
      layout,
    });
  }

  override render() {
    return '{{{layout}}}';
  }
}


