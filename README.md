# configured-eslint-rules

[![npm version](https://img.shields.io/npm/v/configured-eslint-rules.svg)](https://www.npmjs.com/package/configured-eslint-rules)
[![GitHub Actions](https://action-badges.now.sh/shinnn/configured-eslint-rules)](https://wdp9fww0r9.execute-api.us-west-2.amazonaws.com/production/results/shinnn/configured-eslint-rules)
[![codecov](https://codecov.io/gh/shinnn/configured-eslint-rules/branch/master/graph/badge.svg)](https://codecov.io/gh/shinnn/configured-eslint-rules)

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
const configured = configuredESLintRules();
//=> ['no-alert', 'no-array-constructor', 'no-bitwise', 'linebreak-style']
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/about-npm/).

```
npm install configured-eslint-rules
```

## API

```javascript
const configuredEslintRules = require('configured-eslint-rules');
```

### configuredEslintRules([*options*])

*options*: `Object | CLIEngine`  
Return: `string[]`

It returns an `Array` of the [ESLint rule](https://eslint.org/docs/rules/) names that have [rule configurations](https://eslint.org/docs/user-guide/configuring#configuring-rules) on a current working directory.

The optional parameter accepts either a plain `Object` to set [`CLIEngine`](https://eslint.org/docs/developer-guide/nodejs-api#cliengine) options or an already instantiated `CLIEngine`, and affects the result.

```javascript
/*
    ./eslintrc.yml:

    rules:
      eqeqeq: 1
*/

configuredEslintRules(); //=> ['eqeqeq']

configuredEslintRules({rules: {curly: 0}}); //=> ['eqeqeq', 'curly']
```

## License

[ISC License](./LICENSE) © 2018 - 2019 Watanabe Shinnosuke
