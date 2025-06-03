import '../../static/style.scss';

import { MainLayout } from '../../layouts/main/main';
import HomeView  from './home';
import { Sidebar } from '../../layouts/main/components/sidebar/sidebar';
import ChatsList  from '../../modules/chats/chats';
import Block from '../../framework/Block';
import { Button } from '../../components/Button/button';
import router from '../../router';
export class HomePage extends Block {
  constructor() {
    super('div');

    const body = new HomeView();

    const chatsList = new ChatsList();

    const button = new Button({
      props: {
        text: 'Профиль',
      },
      attributes: {
        class: 'button-inline',
        name: 'save',
        id: 'save',
      },
      events: {
        click: (e: Event) => {
          e.preventDefault(); 
          const target = e.target as HTMLButtonElement;
          if (target.name === 'save') {
            router.go('/settings');
          }
        },
      },
    });

    const sidebar = new Sidebar({
      children: {
        content: chatsList,
        button,
      },
    });

    const layout = new MainLayout({
      children: {
        body,
        sidebar,
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
