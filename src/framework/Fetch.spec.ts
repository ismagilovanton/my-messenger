import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import { createSandbox, SinonStub } from 'sinon';
import { HTTPTransport } from './Fetch.ts';
import { beforeEach, it } from 'mocha';

(global as any).XMLHttpRequest = class {
  open() {}

  send() {}

  setRequestHeader() {}
};

describe('HTTPTransport', () => {

  use(sinonChai);

  const sandbox = createSandbox();

  let http: HTTPTransport;
  let request: SinonStub<any>;

  beforeEach(() => {
    http = new HTTPTransport('/');
    request = sandbox.stub(http, 'request' as keyof typeof http).callsFake(() => Promise.resolve(new XMLHttpRequest()));
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should stringify query object for GET request where all parameters are string', async ()=> {
    await http.get('', { data: { a: '1', b: '2' } });

    expect(request).calledWith('https://ya-praktikum.tech/api/v2/', { data: { a: '1', b: '2' }, method: 'GET' }); // Make sure this matches the method signature

  });

});

// import { expect } from 'chai';

// function hello(str: string) {
//   return `Hello ${str}`;
// }

// describe('Typescript + Babel usage suite', () => {
//   it('should return string correctly', () => {
//     expect(hello('mocha'), 'Hello mocha');
//   });
// }); 