import choice from './';

test('choice', () => {
    const result = choice(1, 2, 3, 4, 5);

    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(5);
});

test('choice: Array', () => {
    const dataArray = ['lorem'];
    const result = choice(dataArray);

    expect(result).toBe('lorem');
});
