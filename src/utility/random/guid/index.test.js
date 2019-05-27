import guid from './';

test('guid', () => {
    const result = guid().split('-');

    expect(result).toHaveLength(5);
});
