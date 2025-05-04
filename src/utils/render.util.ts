import Block from "../framework/Block";

export function renderDOM(query: string, component: Block): Element | null {
  const root = document.querySelector(query);

  if (root) {    
    root.appendChild(component.getContent());
    component.dispatchComponentDidMount();
  }

  return root;
}
