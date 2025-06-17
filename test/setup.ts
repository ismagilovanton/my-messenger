import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
});

const { window } = dom;

Object.defineProperties(global, {
  window: {
    value: window,
    writable: true,
  },
  document: {
    value: window.document,
    writable: true,
  },
  navigator: {
    value: window.navigator,
    writable: true,
  },
  History: {
    value: window.History,
    writable: true,
  },
  PopStateEvent: {
    value: window.PopStateEvent,
    writable: true,
  },
}); 
