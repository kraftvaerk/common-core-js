import parseJSON from '.';

test('parseJSON', () => {
    expect(parseJSON('{"test": 1}')).toMatchObject({test: 1});
});
