import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import { createSandbox, SinonStub } from 'sinon';
import { HTTPTransport, API_ENDPOINT } from './Fetch.ts';
import { beforeEach, describe, it } from 'mocha';

const fakeXhr = {
  open: () => {},
  send: () => {},
  status: 200,
  responseText: '{}',
  withCredentials: true,
} as unknown as XMLHttpRequest;

describe('HTTPTransport', () => {

  use(sinonChai);

  const sandbox = createSandbox();

  let http: HTTPTransport;
  let request: SinonStub;

  beforeEach(() => {
    http = new HTTPTransport('/');
    request = sandbox.stub(http, 'request' as keyof typeof http).callsFake((() => {
      return Promise.resolve(fakeXhr);
    }) as any);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Query string', () => {
    it('should stringify simple object', () => {
      const data = { a: '1', b: '2' };
      const result = http.queryString(data);
      expect(result).to.equal('a=1&b=2');
    });

    it('should stringify nested objects', () => {
      const data = { user: { name: 'John', age: '30' } };
      const result = http.queryString(data);
      expect(result).to.equal('user[name]=John&user[age]=30');
    });

    it('should stringify arrays', () => {
      const data = { ids: ['1', '2', '3'] };
      const result = http.queryString(data);
      expect(result).to.equal('ids[]=1&ids[]=2&ids[]=3');
    });

    it('should handle empty object', () => {
      const data = {};
      const result = http.queryString(data);
      expect(result).to.equal('');
    });

    it('should throw error for non-object input', () => {
      expect(() => http.queryString('not-an-object' as any)).to.throw('Input must be a non-null object');
    });

    it('should handle complex nested structures', () => {
      const data = {
        user: {
          name: 'John',
          roles: ['admin', 'user'],
          settings: {
            theme: 'dark',
            notifications: true,
          },
        },
      };
      const result = http.queryString(data);
      expect(result).to.equal(
        'user[name]=John&user[roles][]=admin&user[roles][]=user&user[settings][theme]=dark&user[settings][notifications]=true',
      );
    });
  });

  describe('Requests', () => {

    it('should make GET request with data', async ()=> {
      await http.get('', { data: { a: '1', b: '2' } });
  
      expect(request).calledWith(`${API_ENDPOINT}/`, { data: { a: '1', b: '2' }, method: 'GET' });
    });
  
    it('should make POST request with data', async () => {
      const data = { name: 'test', value: 123 };
      await http.post('', { data });
  
      expect(request).calledWith(`${API_ENDPOINT}/`, { data, method: 'POST' });
    });
  
    it('should make PUT request with data', async () => {
      const data = { id: 1, name: 'updated' };
      await http.put('', { data });
  
      expect(request).calledWith(`${API_ENDPOINT}/`, { data, method: 'PUT' });
    });
  
    it('should make DELETE request', async () => {
      await http.delete('');
  
      expect(request).calledWith(`${API_ENDPOINT}/`, { method: 'DELETE' });
    });
  });


  it('should handle request with custom headers', async () => {
    const headers = { 'Custom-Header': 'test-value' };
    await http.get('', { headers });

    expect(request).calledWith(`${API_ENDPOINT}/`, { headers, method: 'GET' });
  });

  it('should handle request with timeout', async () => {
    const timeout = 1000;
    await http.get('', { timeout });

    expect(request).calledWith(`${API_ENDPOINT}/`, { timeout, method: 'GET' });
  });

});
