# js-utilities

[![Build Status](https://img.shields.io/travis/kraftvaerk/js-utilities/master.svg?style=flat-square)](https://travis-ci.org/kraftvaerk/js-utilities) 
[![npm Version](https://img.shields.io/npm/v/@kraftvaerk/js-utilities.svg?style=flat-square)](https://www.npmjs.com/package/@kraftvaerk/js-utilities) 
[![npm Downloads](https://img.shields.io/npm/dm/@kraftvaerk/js-utilities.svg?style=flat-square)](https://www.npmjs.com/package/@kraftvaerk/js-utilities) 
[![Dependency Status](https://img.shields.io/david/kraftvaerk/js-utilities.svg?style=flat-square)](https://david-dm.org/kraftvaerk/js-utilities) 
[![devDependency Status](https://img.shields.io/david/dev/kraftvaerk/js-utilities.svg?style=flat-square)](https://david-dm.org/kraftvaerk/js-utilities/?type=dev)

> All code is vanilla JS, library agnostic and consist mostly of helper methods that aren't directly related with the DOM, the purpose of this library is to provide modular solutions for common JS problems in kraftvaerk.

## Main goals

 - increase code reuse;
 - be clear (code should be clean/readable);
 - be easy to debug;
 - be easy to maintain;
 - follow best practices;
 - follow standards when possible;
 - be compatible with other frameworks;
 - be modular;
  
## Installation

```bash
npm i @kraftvaerk/js-utilities --save
```

## Usage

#### UUID
```javascript
import uuid from '@kraftvaerk/js-utilities/uuid';

console.log(uuid()); // -> 0e3b84af-f911-4a55-b78a-cedf6f0bd815
```

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


## License

MIT © [Kraftvaerk](http://kraftvaerk.com/)


#	storage

	* local
		* get: (id, def /* default value */)
    	* set: (id, value)
		* del: (id)

	* session
		* get: (id, def /* default value */)
    	* set: (id, value)
		* del: (id)

#	environment

	* env
	* mode
		* mock
		* local
		* development
		* staging
		* production

#	exception

	* InvalidResponseError 
    * InvalidArgumentError 
    * NotImplementedError

#	utility

	* stringify (object)
    * parseJSON (json)
    * clone (source, destination)
    * extend (source, destination)
    * replacePlaceholderParams (placeholder, values, regex, limit)
    * replaceObjectParams (model, values, regex)
    * replaceStringParams (string = '', object = {})
    * urlParams (url, keys = [])
    * parameterize (data = {}, prefix = '?', append = '&')
    * parameterizeUrl (data = {}, prefix = '?', append = '&', url = '', replace = false, encode = false)
    * formToObject (elements = [], exclusions = [''])
