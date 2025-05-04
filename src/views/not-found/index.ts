import '../../static/style.scss';

import { ErrorCard } from '../../components/Error/error';
import { Button } from '../../components/Button/button';
import { renderDOM } from '../../utils/render.util';

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
      code: 404,
      message: 'Не туда попали',
    },
    children: {
      action: backButton,

    },
  });
  
  renderDOM('#app', errorCard);
});

