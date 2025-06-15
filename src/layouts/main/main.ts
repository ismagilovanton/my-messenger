import Block from '../../framework/Block';
import template from './main.tmpl';
import './main.scss';



import hbs from 'handlebars';

hbs.registerHelper('json', function (context) {
  return JSON.stringify(context, null, 2);
});

hbs.registerHelper('eq', function (a, b) {
  return a == b;
});

hbs.registerHelper('formatDate', function (dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',    // "June"
    day: 'numeric',   // "3"
    year: 'numeric',   // "2025"
  }).format(date);
});

interface MainLayoutProps {
  children: {
    sidebar?: Block,
    body?: Block
  }
}

export class MainLayout extends Block {

  constructor(props: MainLayoutProps) {
    super('div', {
      ...props,
    });
  }

  override render(): string {
    return template;
  }
}


