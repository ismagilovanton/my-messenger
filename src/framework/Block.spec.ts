import { expect } from 'chai';
import Block from './Block.ts';



describe('Block', () => {
  class TestBlock extends Block {
    render() {
      return '<div>{{text}}{{{list}}}{{{child}}}</div>';
    }
  }

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should initialize with default values', () => {
    const block = new TestBlock();
    expect(block.element).to.exist;
    expect(block.element?.tagName.toLowerCase()).to.equal('div');
  });

  it('should handle props correctly', () => {
    const props = { text: 'Hello' };
    const block = new TestBlock('div', { props });
    block.init(); 
    
    expect(block.element?.textContent).to.equal('Hello');
  });

  it('should update props correctly', () => {
    const block = new TestBlock('div', { props: { text: 'Hello' } });
    block.init(); 
    block.setProps({ text: 'World' });
    
    expect(block.element?.textContent).to.equal('World');
  });

  it('should handle children correctly', () => {
    const childBlock = new TestBlock('div', { props: { text: 'Child' } });
    const parentBlock = new TestBlock('div', { 
      props: { text: 'Parent' },
      children: { child: childBlock },
    });
    parentBlock.init(); 

    const childElements = parentBlock.element?.querySelectorAll('div');
    expect(childElements?.length).to.be.at.least(1); 
    expect(Array.from(childElements || []).some(el => el.textContent === 'Child')).to.be.true;
  });

  it('should handle events correctly', () => {
    let clicked = false;
    const block = new TestBlock('div', {
      props: { text: 'Click me' },
      events: { click: () => { clicked = true; } },
    });
    block.init(); 

    block.element?.click();
    expect(clicked).to.be.true;
  });

  it('should handle attributes correctly', () => {
    const block = new TestBlock('div', {
      props: { text: 'Test' },
      attributes: { 'data-test': 'value' },
    });
    block.init(); 

    expect(block.element?.getAttribute('data-test')).to.equal('value');
  });

  it('should handle show/hide methods', () => {
    const block = new TestBlock('div', { props: { text: 'Test' } });
    block.init(); 
    
    block.hide();
    expect(block.element?.style.display).to.equal('none');
    
    block.show();
    expect(block.element?.style.display).to.equal('flex');
  });

  it('should handle items (arrays) correctly', () => {
    const items = [
      new TestBlock('div', { props: { text: 'Item 1' } }),
      new TestBlock('div', { props: { text: 'Item 2' } }),
    ];

    const block = new TestBlock('div', {
      props: { text: 'Parent' },
      items: { list: items },
    });
    block.init(); 

    const listElements = block.element?.querySelectorAll('div');
    expect(listElements?.length).to.be.at.least(2);
    expect(Array.from(listElements || []).some(el => el.textContent === 'Item 1')).to.be.true;
    expect(Array.from(listElements || []).some(el => el.textContent === 'Item 2')).to.be.true;
  });

  it('should update items correctly', () => {
    const initialItems = [
      new TestBlock('div', { props: { text: 'Item 1' } }),
    ];

    const block = new TestBlock('div', {
      props: { text: 'Parent' },
      items: { list: initialItems },
    });
    block.init();

    const newItems = [
      new TestBlock('div', { props: { text: 'Item 1' } }),
      new TestBlock('div', { props: { text: 'Item 2' } }),
    ];

    block.setItems({ list: newItems });
    const listElements = block.element?.querySelectorAll('div');
    expect(listElements?.length).to.be.at.least(2); 
    expect(Array.from(listElements || []).some(el => el.textContent === 'Item 1')).to.be.true;
    expect(Array.from(listElements || []).some(el => el.textContent === 'Item 2')).to.be.true;
  });

  it('should handle internal ID setting', () => {
    const block = new TestBlock('div', {
      props: { 
        text: 'Test',
        settings: { withInternalID: true }, 
      },
      
    });
    block.init();

    expect(block.element?.getAttribute('data-id')).to.exist;
  });
});
