import randomHex from './';

test('randomHex', () => {
    expect(randomHex()).toHaveLength(6);
});

test('randomHex: length 30', () => {
    expect(randomHex(30)).toHaveLength(30);
});
