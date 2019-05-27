import parameterize from './';

test('parameterize', () => {
    expect(parameterize({ a: 'b' })).toBe('?a=b');
});

test('parameterize: prefix', () => {
    expect(parameterize({ a: 'b' }, '#')).toBe('#a=b');
});
