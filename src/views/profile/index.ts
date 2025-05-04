
import '../../static/index.ts';

import './profile.scss';

import { SettingsLayout } from '../../layouts/settings/settings.ts';
import { ProfileView } from './profile.ts';
import { renderDOM } from '../../utils/render.util.ts';



document.addEventListener('DOMContentLoaded', () => {



  const body = new ProfileView({});

  const layout = new SettingsLayout({
    props: {
      title: 'Профиль',
    },
    children: {
      body,
    },
  });

  renderDOM('#app', layout);
 
});

