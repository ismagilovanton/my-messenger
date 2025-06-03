import Block from '../../framework/Block';

interface LinkProps {
  props: {
    name: string;
    url: string 
  };
}

export class Link extends Block {
  constructor(props:LinkProps) {
    super('li', {
      ...props,
      attributes: {
        class: 'links__item',
      },
    });
  }

  override render(): string {
    return `
      <li href="{{url}}" class="links__link">
        {{name}}
      </li>
    `;
  }
}
