'use strict';

const {CLIEngine} = require('eslint');
const inspectWithKind = require('inspect-with-kind');
const isPlainObject = require('lodash/isPlainObject');

module.exports = function configuredESLintRules(...args) {
	const argLen = args.length;

	if (argLen > 1) {
		throw new RangeError(`Expected 0 or 1 argument ([<Object>]), but got ${argLen} arguments.`);
	}

	if (argLen === 1 && !isPlainObject(args[0])) {
		throw new TypeError(`Expected an ESLint's CLIEngine options object (<Object>), but got ${
			inspectWithKind(args[0])
		}.`);
	}

	return Object.keys((new CLIEngine(...args)).getConfigForFile().rules);
};
