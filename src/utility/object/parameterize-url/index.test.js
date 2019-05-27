import parameterizeUrl from './';

test('parameterizeUrl', () => {
    expect(parameterizeUrl({ a: 'b+b', c: 'c c' })).toBe('?a=b');
});

test('parameterizeUrl: prefix', () => {
    expect(parameterizeUrl({ a: 'b' }, '#')).toBe('#a=b');
});
