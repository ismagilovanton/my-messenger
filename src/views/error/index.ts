import '../../static/style.scss';

import { ErrorCard } from '../../components/Error/error';
import { Button } from '../../components/Button/button';
import Block from '../../framework/Block';
import router from '../../router';
export class ErrorPage extends Block {
  constructor() {
    super('div');

    const backButton = new Button({
      props: {
        text: 'Назад к чатам',
      },
      attributes: {
        class: 'button-main',
        id: 'button-main',
        name: 'test',
      },
      events: {
        click: () => {
          router.go('/messenger').catch((error) => console.log(error));
        },
      },
    });

    const errorCard  = new ErrorCard({
      props: {
        code: 500,
        message: 'Мы уже фиксим',
      },
      children: {
        action: backButton,
      },
    });
    this.setChildren({
      errorCard,
    });
  }

  override render() {
    return '{{{errorCard}}}';
  }
}
