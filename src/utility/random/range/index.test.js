import randomRange from './';

test('randomRange', () => {
    expect(typeof randomRange()).toBe('number');
});

test('randomRange: min, max', () => {
    const result = randomRange(0, 10);

    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(10);
});
