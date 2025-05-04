import '../../static/style.scss';

import { renderDOM } from '../../utils/render.util';
import { ErrorCard } from '../../components/Error/error';
import { Button } from '../../components/Button/button';

document.addEventListener('DOMContentLoaded', () => {

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
        window.location.href = '/';
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

  renderDOM('#app', errorCard);
});

