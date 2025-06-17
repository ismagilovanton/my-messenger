import { Router } from './Router.ts';
import Block from './Block.ts';
import { expect } from 'chai';
import sinon from 'sinon';
import { describe } from 'mocha';

class MockBlock extends Block {
  render(): string {
    return '<div>Mock Block</div>';
  }
}

describe('Router', () => {
  let router: Router;
  let rootElement: HTMLElement;

  beforeEach(() => {
    (Router as any).__instance = undefined;
    
    rootElement = document.createElement('div');
    rootElement.id = 'app';
    document.body.appendChild(rootElement);

    router = new Router('#app');
  });

  afterEach(() => {
    document.body.innerHTML = '';
    sinon.restore();
  });

  it('should create singleton instance', () => {
    const router2 = new Router('#app');
    expect(router).to.equal(router2);
  });


  describe('Routes', () => {
    it('should add route when use() is called', () => {
      router.use('/test', MockBlock);
      const route = router.getRoute('/test');
      expect(route).to.exist;
    });
    
    it('should handle navigation with go()', async () => {
      const pushStateSpy = sinon.spy(window.history, 'pushState');
      router.use('/test', MockBlock);
        
      await router.go('/test');
        
      expect(pushStateSpy.calledWith({}, '', '/test')).to.be.true;
    });
  });


  describe('Navigation', () => {
    it('should handle back navigation', () => {
      const backSpy = sinon.spy(window.history, 'back');
      router.back();
      expect(backSpy.called).to.be.true;
    });
    
    it('should handle forward navigation', () => {
      const forwardSpy = sinon.spy(window.history, 'forward');
      router.forward();
      expect(forwardSpy.called).to.be.true;
    });
  });

  it('should handle not found route', async () => {
    router.use('/not-found', MockBlock);
    const pushStateSpy = sinon.spy(window.history, 'pushState');
    
    await router.go('/non-existent-route');
    
    expect(pushStateSpy.calledWith({}, '', '/not-found')).to.be.true;
  });


  describe('Middleware', () => {
    it('should handle middleware', async () => {
      const middlewareMock = sinon.spy((next) => next());
      router.use('/test', MockBlock, middlewareMock);
        
      await router.go('/test');
        
      expect(middlewareMock.called).to.be.true;
    });
    
    it('should handle middleware rejection', async () => {
      const middlewareMock = sinon.spy(() => {
        throw new Error('Middleware error');
      });
        
      router.use('/test', MockBlock, middlewareMock);
      router.use('/error', MockBlock);
        
      const pushStateSpy = sinon.spy(window.history, 'pushState');
      const consoleErrorStub = sinon.stub(console, 'error');
    
      await router.go('/test');
        
      expect(pushStateSpy.calledWith({}, '', '/error')).to.be.true;
      expect(consoleErrorStub.called).to.be.true;
      consoleErrorStub.restore();
    });
  });

  it('should handle popstate event', () => {
    router.use('/test', MockBlock);
    const pushStateSpy = sinon.spy(window.history, 'pushState');
    
    window.history.pushState({}, '', '/test');
    const popStateEvent = new PopStateEvent('popstate');
    window.dispatchEvent(popStateEvent);
    
    expect(pushStateSpy.called).to.be.true;
  });
});
