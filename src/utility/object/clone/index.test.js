import clone from '.';

test('clone', () => {
    expect(clone({'test': 1})).toMatchObject({test: 1});
});
