import Block from '../../framework/Block';
import template from './index.tmpl';
import { Link } from '../../components/Link/link';

import router from '../../router';

const linksMock = [
  { name: 'Список чатов и лента переписки', url: '/home' },
  { name: 'Авторизация', url: '/signin' },
  { name: 'Регистрация', url: '/signup' },
  { name: 'Настройки пользователя', url: '/profile' },
  { name: 'Страница 404', url: '/not-found' },
  { name: 'Страница 5**', url: '/error' },
];

export class IndexPage extends Block {
  constructor() {

    const links = linksMock.map(linkMock => 
      new Link({ props:{ name: linkMock.name, url: linkMock.url } }),
    );

    super('div', {
      items: { links: links },
      events: {
        click: (e: Event) => {
          const target = e.currentTarget as HTMLLIElement | null;
          if (target instanceof HTMLLIElement) {
            const url = target?.getAttribute('href');

            if (url) {
              router.go(url);
            }
          }
        },
      },
    });
  }

  override render() {
    return template;
  }

  addEvents(): void {
    const links = this.element?.querySelectorAll('.links__item');
    
    links?.forEach((link) => {
      Object.keys(this._events).forEach((eventName) => {
        link.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
  
          this._events[eventName](e); 
        });
      });
    });
  }
}
//
