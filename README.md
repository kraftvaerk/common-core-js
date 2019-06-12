# 🧺 lota-js

[![Build Status](https://img.shields.io/travis/kraftvaerk/lota-js/master.svg?style=flat-square)](https://travis-ci.org/kraftvaerk/lota-js) 
[![npm Version](https://img.shields.io/npm/v/@kraftvaerk/lota-js.svg?style=flat-square)](https://www.npmjs.com/package/@kraftvaerk/lota-js) 
[![npm Downloads](https://img.shields.io/npm/dm/@kraftvaerk/lota-js.svg?style=flat-square)](https://www.npmjs.com/package/@kraftvaerk/lota-js) 
[![Dependency Status](https://img.shields.io/david/kraftvaerk/lota-js.svg?style=flat-square)](https://david-dm.org/kraftvaerk/lota-js) 
[![devDependency Status](https://img.shields.io/david/dev/kraftvaerk/lota-js.svg?style=flat-square)](https://david-dm.org/kraftvaerk/lota-js/?type=dev)

> All code is vanilla JS, library agnostic and consist mostly of helper methods that aren't directly related with the DOM, the purpose of this library is to provide modular solutions for common JS problems in kraftvaerk.

## Main goals

 - increase code reuse;
 - be easy to debug;
 - be easy to maintain;
 - follow best practices;
 - be compatible with other frameworks;
 - be modular;
  
## Installation

```bash
npm i @kraftvaerk/lota-js --save
```

## Contents

### Browser
* [`cookie`](#cookie)
* [`Local storage`](#UUID)
* [`Session storage`](#UUID)

### Enviorment
* -

### Exception
* -

### Utilities
* Function
    * [`debounce`](#debounce)
    * [`throttle`](#throttle)
* Object
    * [`clone`](#clone)
    * [`extend`](#extend)
    * [`formToObject`](#formToObject)
    * [`parameterize`](#parameterize)
    * [`parameterizeUrl`](#parameterizeUrl)
    * [`urlParams`](#urlParams)
    * [`urlHashParams`](#urlHashParams)
* Random
    * [`choice`](#choice)
    * [`guid`](#guid)
    * [`hex`](#hex)
    * [`int`](#randomInt)
    * [`number`](#randomNumber)
* String
    * [`interpolate`](#interpolate)
    * [`trim`](#trim)


## Another Lodash?

No. The goal is to provide frontend developers in Kraftvaerk with a number of useful and small JavaScript codes, not just functions, but also modules and classes. Think of it as a mini version of npm suitable for tiny packages.


## What shouldn't be here ##

 - UI components;
 - CSS selector engine;
 - Event system - pub/sub;
 - Template engine;
 - Anything that isn't generic enough;
 - Anything that could be a separate library and/or isn't a modular utility...

## Submitting New Modules

Unable to find one suitable? Fork it on GitHub, add the module and submit a pull
request.

#### 
<br>[⬆ Back to top](#contents)

### Debounce
This Creates a function that will delay the execution of fn until after delay milliseconds have elapsed since the last time it was invoked.
Subsequent calls to the debounced function will return the result of the last fn call.
 
```js
debounce(fn, delay[, isAsap]):Function
```

<details>
<summary>Examples</summary>

```javascript
const lazyRedraw = debounce(redraw, 300);

foo.on.resize.add(lazyRedraw);

//lazyRedraw won't be called since `cancel` was called before the `delay`
lazyRedraw.cancel();
```
</details>


### Throttle
Creates a function that, when executed, will only call the fn function at most once per every interval milliseconds.

If the throttled function is invoked more than once during the wait timeout, fn will also be called on the trailing edge of the timeout.
Subsequent calls to the throttled function will return the result of the last fn call.
 
```js
throttle(fn, interval):Function
```

<details>
<summary>Examples</summary>

```javascript
const lazyRedraw = throttle(redraw, 300);
foo.on.resize.add(lazyRedraw);
lazyRedraw();
setTimeout(function(){
    lazyRedraw();
    
    // lazyRedraw will be called only once since 'cancel' was called before the 'interval' for 2nd call completed
    lazyRedraw.cancel();
}, 250);
```
</details>

### Choice
Returns a random element from the supplied arguments or from the array (if single argument is an array).

```js
choice(...items):*
```

<details>
<summary>Examples</summary>

```javascript
choice(1, 2, 3, 4, 5); // 3

choice(['lorem', 'ipsum', 'dolor']); // 'dolor'
```
</details>

### Guid
Generates a pseudo-random Globally Unique Identifier Since the total number of GUIDs is 2^122 the chance of generating the same value twice is negligible.

Important: this method uses Math.random by default so the UUID isn't safe (sequence of outputs can be predicted in some cases),

Returns pseudo-random guid (UUID v4)
IMPORTANT: it's not totally "safe" since randomHex/choice uses Math.random by default and sequences can be predicted in some cases.

```js
guid():String
```

<details>
<summary>Examples</summary>

```javascript
guid(); // 807a16ee-0258-4342-a34c-3d3638a27876
```
</details>

### Hex
Returns a random hexadecimal string with the default length of 6
 
```js
randomHex([size=6]):String
```

<details>
<summary>Examples</summary>

```javascript
randomHex();   // "dd8575"
randomHex(30); // "effd7e2ad9a4a3067e30525fab983a"
```
</details>

### RandomInt
Returns a random integer inside range or snap to min/max values.
 
```js
randInt([min], [max]):Number
```

<details>
<summary>Examples</summary>

```javascript
randomInt();      // 448740433
randomInt();      // -31797596
randomInt(0, 10); // 7
randomInt(0, 10); // 5
```
</details>

### RandomNumber
Returns a random number inside range or snap to min/max values

```js
randomNumber([min], [max]):Number
```

<details>
<summary>Examples</summary>

```javascript
randomNumber();      // 448740433.55274725
randomNumber();      // -31797596.097682
randomNumber(0, 10); // 7.369723
randomNumber(0, 10); // 5.987042
```
</details>

### Interpolate
String interpolation. Format/replace tokens with object properties.

```js
interpolate(str, replacements[, syntax]):String
```

<details>
<summary>Examples</summary>

```javascript
const tmpl = 'Hello {{name}}!';
interpolate(tmpl, {name: 'World'});       // "Hello World!"

const tmpl = 'Hello {{name.first}}!';
interpolate(tmpl, {name: {first: 'Lorem'}}); // "Hello Lorem!"

// matches everything inside "${}"
const syntax = /\$\{([^}]+)\}/g;
const tmpl = "Hello ${0}!";
interpolate(tmpl, ['Foo Bar'], syntax); // "Hello Foo Bar!"
```
</details>

### Trim
Remove chars or white-spaces from beginning and end of string. chars is an array of chars to remove from the beginning and end
of the string. If chars is not specified, Unicode whitespace chars will be used instead.

```js
trim(str, [chars]):String
```

<details>
<summary>Examples</summary>

```javascript
trim('   lorem ipsum   ');             // "lorem ipsum"
trim('-+-lorem ipsum-+-', ['-', '+']); // "lorem ipsum"
```
</details>

### rTrim
Remove chars or white-spaces from end of string. chars is an array of chars to remove from the end
of the string. If chars is not specified, Unicode whitespace chars will be used instead.

```js
rtrim(str, [chars]):String
```

<details>
<summary>Examples</summary>

```javascript
rtrim('   lorem ipsum   ');      // "   lorem ipsum"
rtrim('--lorem ipsum--', ['-']); // "--lorem ipsum"
```
</details>

### lTrim
Remove chars or white-spaces from beginning of string. chars is an array of chars to remove from the beginning
of the string. If chars is not specified, Unicode whitespace chars will be used instead.

```js
ltrim(str, [chars]):String
```

<details>
<summary>Examples</summary>

```javascript
ltrim('   lorem ipsum   ');      // "lorem ipsum   "
ltrim('--lorem ipsum--', ['-']); // "lorem ipsum--"
```
</details>

## License

MIT © [Kraftvaerk](http://kraftvaerk.com/)
