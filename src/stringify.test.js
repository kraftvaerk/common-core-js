import stringify from './stringify';

test('stringify', () => {
    expect(stringify({test: 1})).toBe('{"test":1}');
});
