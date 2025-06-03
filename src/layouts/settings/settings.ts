import Block from '../../framework/Block';
import template from './settings.tmpl';
import './settings.scss';
import router from '../../router';
import { ButtonIcon } from '../../components/ButtonIcon/buttonIcon';
import ArrowLeft from '../../../public/icons/arrow-left.svg';
interface SettingsLayoutProps {
  props: {
    title: string
  },
  children: {
    body: Block,
  }
}

export class SettingsLayout extends Block {
  constructor(props: SettingsLayoutProps) {
    super('div', { ...props });


    const changeData = new ButtonIcon({
      props: {
        icon:{ 
          src: ArrowLeft,
          alt: 'Back',
        },
      },
      attributes: {
        class: 'button-icon',
        name: 'changeData',
        id: 'change-data',
        type: 'button',
      },
      events: {
        click: () => {
          router.go('/messenger');
        },
      },
    });

    this.setChildren({
      changeData,
    });

  }  

  override render(): string {
    return template;
  }
}

