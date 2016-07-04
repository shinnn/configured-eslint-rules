# configured-eslint-rules

[![NPM version](https://img.shields.io/npm/v/configured-eslint-rules.svg)](https://www.npmjs.com/package/configured-eslint-rules)
[![Build Status](https://travis-ci.org/shinnn/configured-eslint-rules.svg?branch=master)](https://travis-ci.org/shinnn/configured-eslint-rules)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/configured-eslint-rules.svg)](https://coveralls.io/r/shinnn/configured-eslint-rules)
[![Dependency Status](https://david-dm.org/shinnn/configured-eslint-rules.svg)](https://david-dm.org/shinnn/configured-eslint-rules)
[![devDependency Status](https://david-dm.org/shinnn/configured-eslint-rules/dev-status.svg)](https://david-dm.org/shinnn/configured-eslint-rules#info=devDependencies)

Detect configured [ESLint](http://eslint.org/) rules

```javascript
/*
    ./eslintrc.json:

    {
      "rules": {
        "no-alert": 2,
        "no-array-constructor": 1,
        "no-bitwise": 0,
        "linebreak-style": [2, "unix"],
      }
    }
*/

const configuredESLintRules = require('configured-eslint-rules');
const configured = configuredESLintRules(); //=> ['no-alert', 'no-array-constructor', 'no-bitwise', 'linebreak-style']
```

## Installation

[Use npm](https://docs.npmjs.com/cli/install).

```
npm install configured-eslint-rules
```

## API

```javascript
const configuredEslintRules = require('configured-eslint-rules');
```

### configuredEslintRules([*filePath*][, *options*])

*filePath*: `String`  
*options*: `Object`  
Return: `Array` of `String`

It returns an array of the [ESLint rule](http://eslint.org/docs/rules/) names that have [rule configurations](http://eslint.org/docs/user-guide/configuring#configuring-rules) on a current working directory.

The `filePath` argument will be directly passed to [`cli.getConfigForFile()`](http://eslint.org/docs/developer-guide/nodejs-api#getconfigforfile) and you can set a file path where this function retrives the rules, instead of CWD.

```javascript
/*
    ./dir/.eslintrc.json:

    {
      "rules": {
        "semi": [2, "always"]
      }
    }
*/

configuredEslintRules('dir/index.js');  //=> ['semi']
configuredEslintRules('no_config_dir/index.js'); // throws "no configuration" error
```

The `options` argument will be directly passed to the [`CLIEngine`](http://eslint.org/docs/developer-guide/nodejs-api#cliengine) constructor and you can set additional options.

```javascript
/*
    ./eslintrc.yml:

    rules:
      eqeqeq: 1
*/

configuredEslintRules({
  rules: {curly: 0},
  useEslintrc: false
}); //=> ['curly']
```

## License

Copyright (c) 2015 - 2016 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
