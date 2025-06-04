import Block from '../framework/Block';

export function renderDOM(query: string, component: Block): Element | null {
  const root = document.querySelector(query);

  if (root) {    
    const content = component.getContent();
    if (content) {
      root.appendChild(content);
    }
    component.dispatchComponentDidMount();
  }

  return root;
}


