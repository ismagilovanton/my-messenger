import EventBus from './EventBus.ts';
import Handlebars from 'handlebars';

export interface PropsWithChildren {
  props?: Record<string, unknown>;
  children?: Record<string, Block>;
  items?: Record<string, Block[]>;
  events?: Record<string, (e: Event) => void>;
  attributes?: Record<string, string>;
  settings?: {
    withInternalID?: boolean;
  };
}

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  } as const;

  private _meta: {
    tagName: string;
  };
  
  protected _props: Record<string, unknown>;

  protected _children: Record<string, Block>;

  private _id = Math.floor(100000 + +Math.random() * 9000000);

  private _element: HTMLElement | null = null;
  
  protected _items: Record<string, Block[]>;

  private _attributes: Record<string, string>;

  protected _events: Record<string, (e: Event) => void>;

  private _eventBus: EventBus;

  constructor(tagName: string = 'div', propsWithChildren: PropsWithChildren = {}) {
    const { props = {}, children = {}, items = {}, attributes = {}, events = {} } = propsWithChildren;

    this._meta = { tagName };
    this._eventBus = new EventBus();
    this._props = this._makePropsProxy(props);
    this._children = this._makePropsProxy(children) as Record<string, Block>;
    this._items = items;
    this._attributes = attributes;
    this._events = events;
    
    this._registerEvents(this._eventBus);
    this._eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  private _componentDidUpdate(...args: unknown[]): void {
    const [oldProps, newProps] = args as [Record<string, unknown>, Record<string, unknown>];
    const shouldUpdate = this.componentDidUpdate(oldProps, newProps);
    if (shouldUpdate) {
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private _makePropsProxy(props: Record<string, unknown>) {
    return new Proxy(props, {
      get: (target, prop) => {
        if (typeof prop === 'string' && prop.startsWith('_')) {
          throw new Error('Отказано в доступе к приватному свойству');
        }

        if (typeof prop === 'symbol') {
          return undefined;
        }

        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) =>{
        if (typeof prop === 'string' && prop.startsWith('_')) {
          throw new Error('Отказано в доступе к приватному свойству');
        }

        if (typeof prop === 'symbol') {
          return false;
        }

        const oldProps: Record<string, unknown> = { ...target };
        target[prop] = value;
        this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа к удалению свойств');
      },
    });
  }

  private _createDocumentElement(tagName: string) {    
    const element = document.createElement(tagName);
    
    const settings = this._props.settings as { withInternalID?: boolean } | undefined;
    if (settings?.withInternalID) {
      element.setAttribute('data-id', this._id.toString());
    }

    return element;
  }

  _render() {
    this._removeEvents();
  
    const propsAndStubs: Record<string, unknown> = { ...this._props };
  
    // Handle single children
    Object.entries(this._children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });
  
    // Handle lists (arrays of children)
    Object.entries(this._items).forEach(([key, childList]) => {
      if (Array.isArray(childList)) {
        propsAndStubs[key] = childList.map(child => 
          `<div data-id="${child._id}"></div>`,
        ).join('');
      }
    });
  
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
  
    // Replace single children
    Object.values(this._children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      const content = child.getContent();
      if (stub && content) {
        stub.replaceWith(content);
      }
    });
  
    // Replace list items
    Object.entries(this._items).forEach(([key, childList]) => {
      if (!Array.isArray(childList)) {
        console.warn(`Expected array for key "${key}", but got`, childList);
        return;
      }
    
      childList.forEach((item) => {
        if (item instanceof Block) {
          const stub = fragment.content.querySelector(`[data-id="${item._id}"]`);
          const content = item.getContent();
          if (stub && content) {
            stub.replaceWith(content);
          }
        }
      });
    });
  
    const newElement = fragment.content.firstElementChild;
  
    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }
  
    this._element = newElement as HTMLElement;

    const settings = this._props.settings as { withInternalID?: boolean } | undefined;
    if (settings?.withInternalID) {
      this._element?.setAttribute('data-id', this._id.toString());
    }

    this.addEvents();
    this._addAttributes();
  }

  addEvents() {
    Object.keys(this._events).forEach((eventName) => {
      this._element?.addEventListener(eventName, this._events[eventName]);
    });
  }
  
  private _removeEvents() {
    Object.keys(this._events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, this._events[eventName]);
    });
  }

  private _addAttributes() {
    Object.entries(this._attributes).forEach(([key, value]) => {
      this._element?.setAttribute(key, value);
    });
  }

  get element() {
    return this._element;
  }

  init() {
    this._createResources();
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  componentDidUpdate(
    _oldProps: Record<string, unknown>, 
    _newProps: Record<string, unknown>,
  ) {
    console.log(_oldProps, _newProps);
    return true;
  }

  setProps(nextProps: Record<string, unknown>) {
    if (!nextProps) return;

    const oldProps: Record<string, unknown> = { ...this._props };    
    this._props = this._makePropsProxy({ ...this._props, ...nextProps });
    this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, this._props);
  }

  setItems(nextItems: Record<string, Block[]>) {
    if (!nextItems) return;

    const oldItems: Record<string, Block[]> = { ...this._items };
    this._items = { ...this._items, ...nextItems };
    this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldItems, this._items);
  }

  setChildren(nextChildren: Record<string, Block>) {
    if (!nextChildren) return;

    const oldChildren = { ...this._children };
    this._children = { ...this._children, ...nextChildren };
    this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldChildren, this._children);
  }

  render() {
    return '';
  }

  getContent() {
    return this.element;
  }

  show() {
    if (this._element) {
      const content = this.getContent();
      if (content) {
        content.style.display = 'flex';
      }
    }
  }

  hide() {
    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    }
  }
}


