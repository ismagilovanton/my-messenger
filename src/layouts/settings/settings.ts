import Block from '../../framework/Block';
import template from './settings.tmpl';
import './settings.scss';


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
  }

  override render(): string {
    return template;
  }
}

