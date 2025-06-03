import EventBus from './EventBus';
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

  private _meta = {
    tagName: 'div',
  };
  
  protected _props: PropsWithChildren | null = null;

  protected _children: Record<string, any> = {};

  private _id = Math.floor(100000 + +Math.random() * 9000000);

  private _element: HTMLElement | null = null;
  
  protected _items: Record<string, any[]> = {};

  private _attributes: Record<string, any> = {};

  protected _events: Record<string, any> = {};

  private _eventBus: EventBus | null = null;

  /**
   * @param {string} tagName
   * @param {Object} props
   */
  constructor(tagName: string = 'div', propsWithChildren: PropsWithChildren = {}) {

    const { props = {}, children = {}, items = {}, attributes = {}, events = {} } = propsWithChildren;

    this._eventBus = new EventBus();
      
    this._props = this._makePropsProxy({ ...props });
    this._children = this._makePropsProxy({ ...children });
    this._attributes = this._makePropsProxy({ ...attributes });
    this._items = items;
    this._events = events;
    this._meta = { tagName };
    this._registerEvents(this._eventBus);
    this._eventBus.emit(Block.EVENTS.INIT);
  }

  // private _getChildrenPropsAndProps(propsWithChildren: PropsWithChildren) {
  //   const props: Record<string, unknown> = {};
  //   const children: Record<string, Block> = {};
  //   const items: Record<string, Block[]> = {};

  //   Object.entries(propsWithChildren).forEach(([key, value]) => {
  //     if (value instanceof Block) {
  //       children[key] = value;
  //     } else if (Array.isArray(value)) {
  //       items[key] = value;
  //     } else {
  //       props[key] = value;
  //     }
  //   });

  //   return {
  //     props,
  //     children,
  //     items,
  //   };
  // }

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
      this._eventBus?.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private _makePropsProxy(props: Record<string, unknown>) {
    return new Proxy(props, {
      get: (target, prop) => {
        if (typeof prop === 'string' && prop.startsWith('_')) {
          throw new Error('Отказано в доступе к приватному свойству');
        }

        if (typeof prop === 'symbol') {
          return undefined; // Игнорируем символы
        }

        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) =>{
        if (typeof prop === 'string' && prop.startsWith('_')) {
          throw new Error('Отказано в доступе к приватному свойству');
        }

        if (typeof prop === 'symbol') {
          return false; // Игнорируем символы
        }

        const oldProps: Record<string, unknown> = { ...target };
        target[prop] = value;
        if (this._eventBus) {
          this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        }
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа к удалению свойств');
      },
    });
  }

  private _createDocumentElement(tagName: string) {    
    const element =  document.createElement(tagName);

    if (this._props?.settings?.withInternalID) {
      element.setAttribute('data-id', this._id.toString());
    }

    return element;
  }

  _render() {
    this._removeEvents();
  
    const propsAndStubs: Record<string, unknown> = { ...this._props };
  
    // Updated listTmpIds to handle multiple ids per list
    const listTmpIds: Record<string, string> = {};
  
    // Handle single children
    Object.entries(this._children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });
  
    // Handle lists (arrays of children)
    Object.entries(this._items).forEach(([key]) => {
      const tmpId = Math.floor(100000 + Math.random() * 9000000).toString();
      listTmpIds[key] = tmpId;
      // 👇 only one div, no multiple divs
      propsAndStubs[key] = `<div data-id="__l_${tmpId}"></div>`;
    });
  
  
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
  
  
    // Replace single children
    Object.values(this._children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });
  
    // Replace list items
    Object.entries(this._items).forEach(([key, childList]) => {
      const tmpId = listTmpIds[key];
      const stub = fragment.content.querySelector(`[data-id="__l_${tmpId}"]`);
    
      if (!Array.isArray(childList)) {
        console.warn(`Expected array for key "${key}", but got`, childList);
        return;
      }
    
      if (stub) {
        childList.forEach((item) => {
          if (item instanceof Block) {
            const content = item.getContent();
            if (content) {
              stub.parentNode?.insertBefore(content, stub);
            }
          } else {
            stub.parentNode?.insertBefore(document.createTextNode(String(item)), stub);
          }
        }); 
        stub.remove();
      } else {
        console.warn(`Stub not found for list "${key}" with tmpId "${tmpId}"`);
      }
    });
    
  
    const newElement = fragment.content.firstElementChild;
  
    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }
  
    this._element = newElement as HTMLElement;
    this.addEvents();
    this._addAttributes();
  }

  addChildren() {
    
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
    // this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    if (this._eventBus) {
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    if (this._eventBus) {
      this._eventBus.emit(Block.EVENTS.FLOW_CDM);
    }
  }

  componentDidUpdate(
    oldProps: Record<string, unknown>, 
    newProps: Record<string, unknown>,
  ) {
    console.log(oldProps, newProps);
    return true;
  }

  setProps(nextProps: Record<string, unknown>) {
    if (!nextProps) return;

    const oldProps: Record<string, unknown> = { ...this._props };    
  
    this._props = this._makePropsProxy({ ...this._props, ...nextProps });
  
    if (this._eventBus) {
      this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, this._props);
    }
  }

  setItems(nextItems: Record<string, any[]>) {
    if (!nextItems) return;

    const oldItems: Record<string, any[]> = { ...this._items };
    // console.log('Old items:', oldItems, 'New items:', nextItems);

    this._items = this._makePropsProxy({ ...this._items, ...nextItems }) as Record<string, any[]>;

    // Emit the FLOW_CDU event to trigger re-rendering
    if (this._eventBus) {
      this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldItems, this._items);
    }

  }

  setChildren(nextChildren: Record<string, any>) {
    if (!nextChildren) return;

    const oldChildren = { ...this._children };
    // console.log('Old children:', oldChildren, 'New children:', nextChildren);

    this._children = this._makePropsProxy({ ...this._children, ...nextChildren });

    // Emit the FLOW_CDU event to trigger re-rendering
    if (this._eventBus) {
      this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldChildren, this._children);
    }
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

