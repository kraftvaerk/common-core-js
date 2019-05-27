import urlParams from './';

test('urlParams', () => {
    expect(urlParams('http://www.test.com?a=1&b=2&c=true&d=null')).toBe({a: '1', b: '2', c: true, d: null});
});
