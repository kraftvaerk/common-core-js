import parseJSON from './parse-json';

test('parseJSON', () => {
    expect(parseJSON('{"test": 1}')).toMatchObject({test: 1});
});
