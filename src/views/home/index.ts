import '../../static/style.scss';

import { MainLayout } from '../../layouts/main/main';
import { HomeView } from './home';
import { renderDOM } from '../../utils/render.util';
import { Sidebar } from '../../layouts/main/components/sidebar/sidebar';
import { ChatsList } from '../../modules/chats/chats';



document.addEventListener('DOMContentLoaded', () => {

  const body = new HomeView({});

  const chatsList = new ChatsList({});

  const sidebar = new Sidebar({
    children: {
      content: chatsList,
    },
  });
  
  const layout = new MainLayout({
    children: {
      body,
      sidebar,
    },
  });

  renderDOM('#app', layout);
});

