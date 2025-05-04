import Block from '../../../../framework/Block';
import template from './sidebar.tmpl';
import './sidebar.scss';
interface SidebarProps {
  props?: any,
  children: {
    content: Block
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
