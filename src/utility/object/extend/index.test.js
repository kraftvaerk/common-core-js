import extend from '.';

test('extend', () => {
    expect(extend({a: 'b' }, { c: 'd' })).toMatchObject({ a: 'b', c: 'd' });
});
