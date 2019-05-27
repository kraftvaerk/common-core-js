import randomInt from './';

test('randomInt', () => {
    expect(typeof randomInt()).toBe('number');
});

test('randomInt: min, max', () => {
    const result = randomInt(0, 10);

    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(10);
});
