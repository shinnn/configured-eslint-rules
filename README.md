# configured-eslint-rules

[![npm version](https://img.shields.io/npm/v/configured-eslint-rules.svg)](https://www.npmjs.com/package/configured-eslint-rules)
[![Build Status](https://travis-ci.org/shinnn/configured-eslint-rules.svg?branch=master)](https://travis-ci.org/shinnn/configured-eslint-rules)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/configured-eslint-rules.svg)](https://coveralls.io/github/shinnn/configured-eslint-rules)

Detect configured [ESLint](https://eslint.org/) rules

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

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install configured-eslint-rules
```

## API

```javascript
const configuredEslintRules = require('configured-eslint-rules');
```

### configuredEslintRules([*filePath*][, *options*])

*filePath*: `string`  
*options*: `Object`  
Return: `Array<string>`

It returns an array of the [ESLint rule](http://eslint.org/docs/rules/) names that have [rule configurations](http://eslint.org/docs/user-guide/configuring#configuring-rules) on a current working directory.

The `filePath` argument will be directly passed to [`cli.getConfigForFile()`](https://eslint.org/docs/developer-guide/nodejs-api#clienginegetconfigforfile) and you can set a file path where this function retrives the rules, instead of CWD.

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

Copyright (c) 2015 - 2018 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
