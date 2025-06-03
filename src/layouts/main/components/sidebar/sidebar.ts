import Block from '../../../../framework/Block';
import template from './sidebar.tmpl';
import './sidebar.scss';
import { Button } from '../../../../components/Button/button';
interface SidebarProps {
  children: {
    content: Block
    button: Button
  }
}
export class Sidebar extends Block {
  constructor(props: SidebarProps) {




    super('div', { ...props });
  }

  override render() {
    return template;
  }
}

