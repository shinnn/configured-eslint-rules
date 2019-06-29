'use strict';

const {CLIEngine} = require('eslint');
const inspectWithKind = require('inspect-with-kind');
const isPlainObject = require('lodash/isPlainObject');

module.exports = function configuredESLintRules(...args) {
	const argLen = args.length;
	const [options] = args;
	const isCLIEngine = options instanceof CLIEngine;

	if (argLen === 1) {
		if (!isPlainObject(options) && !isCLIEngine) {
			const error = new TypeError(`Expected an ESLint's CLIEngine instance or a plain object to set CLIEngine options, but got ${
				inspectWithKind(options)
			}.`);

			error.code = 'ERR_INVALID_ARG_TYPE';
			throw error;
		}
	} else if (argLen !== 0) {
		const error = new RangeError(`Expected 0 or 1 argument (<Object|CLIEngine>), but got ${argLen} arguments.`);

		error.code = 'ERR_TOO_MANY_ARGS';
		throw error;
	}

	return Object.keys((isCLIEngine ? options : new CLIEngine(...args)).getConfigForFile('file.js').rules);
};
