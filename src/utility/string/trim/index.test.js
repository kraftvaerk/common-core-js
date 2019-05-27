import trim, { rtrim, ltrim } from './';

test('trim', () => {
    expect(trim('   lorem ipsum   ')).toBe('lorem ipsum');
    expect(trim('-+-lorem ipsum-+-', ['-', '+'])).toBe('lorem ipsum');
});

test('ltrim', () => {
    expect(ltrim('   lorem ipsum   ')).toBe('lorem ipsum   ');
    expect(ltrim('--lorem ipsum--', ['-'])).toBe('lorem ipsum--');
});

test('rtrim', () => {
    expect(rtrim('   lorem ipsum   ')).toBe('   lorem ipsum');
    expect(rtrim('--lorem ipsum--', ['-'])).toBe('--lorem ipsum');
});
