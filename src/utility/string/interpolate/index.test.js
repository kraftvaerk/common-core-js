import interpolate from './';

test('interpolate', () => {
    const tmpl = 'Hello {{0}}!';
    const data = ['World'];

    const result = interpolate(tmpl, data);

    expect(result).toBe('Hello World!');
});

test('interpolate: Object', () => {
    const tmpl = 'Hello, {{name.first}}!';
    const data = {
        name: {
            first: 'John',
            last: 'Doe'
        }
    };

    const result = interpolate(tmpl, data);

    expect(result).toBe('Hello, John!');
});

test('interpolate: Custom syntax', () => {
    const syntax = /\$\{([^}]+)\}/g;
    const tmpl = 'Hello ${0}!';
    const data = ['Foo'];

    const result = interpolate(tmpl, data, syntax);

    expect(result).toBe('Hello Foo!');
});
