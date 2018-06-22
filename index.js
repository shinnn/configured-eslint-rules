'use strict';

const {CLIEngine} = require('eslint');
const inspectWithKind = require('inspect-with-kind');
const isPlainObject = require('lodash/isPlainObject');

module.exports = function configuredESLintRules(...args) {
  const argLen = args.length;

  if (argLen > 2) {
    throw new RangeError(`Expected 0, 1 or 2 arguments ([<string>][, <Object>]), but got ${argLen} arguments.`);
  }

  if (argLen === 0) {
    return Object.keys((new CLIEngine()).getConfigForFile().rules);
  }

  if (argLen === 1) {
    if (typeof args[0] === 'string') {
      return Object.keys((new CLIEngine()).getConfigForFile(args[0]).rules);
    }

    if (!isPlainObject(args[0])) {
      throw new TypeError(`Expected the first argument to be a string or Object, but got ${
        inspectWithKind(args[0])
      }.`);
    }

    return Object.keys((new CLIEngine(args[0])).getConfigForFile().rules);
  }

  const [filePath, options] = args;

  if (typeof filePath !== 'string') {
    throw new TypeError(`Expected a file path (string), but got a non-string value ${
      inspectWithKind(filePath)
    }.`);
  }

  if (!isPlainObject(options)) {
    throw new TypeError(
      String(options) +
      ' is not an object. Second argument must be an ESLint\'s CLI engine option object.'
    );
  }

  return Object.keys((new CLIEngine(options)).getConfigForFile(filePath).rules);
};
