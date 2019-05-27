import urHashParams from './';

test('urHashParams', () => {
    expect(urHashParams('#?a=1&b=2&c=true&d=null')).toBe({a: '1', b: '2', c: true, d: null});
});
