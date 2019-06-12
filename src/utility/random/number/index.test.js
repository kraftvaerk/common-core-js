import randomNumber from './';

test('randomNumber', () => {
    expect(typeof randomNumber()).toBe('number');
});

test('randomNumber: min, max', () => {
    const result = randomNumber(0, 10);

    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(10);
});
