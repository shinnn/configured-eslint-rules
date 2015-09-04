'use strict';

const CLIEngine = require('eslint').CLIEngine;

module.exports = function configuredESLintRules(filePath, options) {
  if ((filePath !== undefined || options !== undefined) && typeof filePath !== 'string') {
    if (options || typeof filePath !== 'object') {
      throw new TypeError(
        String(filePath) +
        ' is not a string or an object. Expected a file path to retrieve a ESLint config object for,' +
        ' or an ESLint\'s CLI engine option object.'
      );
    }

    options = filePath;
    filePath = null;
  }

  if (options) {
    if (typeof options !== 'object') {
      throw new TypeError(
        String(options) +
        ' is not an object. Second argument must be an ESLint\'s CLI engine option object.'
      );
    }
  }

  return Object.keys((new CLIEngine(options)).getConfigForFile(filePath).rules);
};
