import '../../static/style.scss';

import { ErrorCard } from '../../components/Error/error';
import { Button } from '../../components/Button/button';
import Block from '../../framework/Block';
import router from '../../router';
export class NotFoundPage extends Block {
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
          router.go('/').catch((error) => console.log(error));
        },
      },
    });

  
    const errorCard  = new ErrorCard({
      props: {
        code: 404,
        message: 'Не туда попали',
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
