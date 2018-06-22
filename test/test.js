'use strict';

const {join, parse} = require('path');
const {unlink, writeFile} = require('fs').promises;

const test = require('tape');
const configuredESLintRules = require('..');

test('configuredESLintRules()', async t => {
	await writeFile(join(__dirname, '.eslintrc.yml'), `root: true
rules:
  eol-last: 0
`);

	process.chdir(__dirname);

	t.deepEqual(
		configuredESLintRules('test.js'),
		['eol-last'],
		'should retrieve configured rules for a given file.'
	);

	t.deepEqual(
		configuredESLintRules({rules: {'no-alert': 2}}),
		['eol-last', 'no-alert'],
		'should use additional CLIEngine options as its last argument.'
	);

	process.chdir(join(__dirname, '..'));

	t.deepEqual(
		configuredESLintRules('test/test.js', {useEslintrc: false}),
		[],
		'should return an empty array when `useEslintrc` option is enabled and no rules are specified.'
	);

	await unlink(join(__dirname, '.eslintrc.yml'));
	process.chdir(parse(__dirname).root);

	t.throws(
		() => configuredESLintRules(),
		/^Error.*No ESLint configuration found\./,
		'should throw an error when it cannot find any configuration.'
	);

	t.throws(
		() => configuredESLintRules(true),
		/^TypeError.*Expected the first argument to be a string or Object, but got true \(boolean\)\./,
		'should throw a type error when the first argument is neither a string nor an object.'
	);

	t.throws(
		() => configuredESLintRules(null, {}),
		/^TypeError.*Expected a file path \(<string>\), but got a non-string value null\./,
		'should throw a type error when the second argument is truthy but the first isn\'t.'
	);

	t.throws(
		() => configuredESLintRules('index.js', 1),
		/TypeError.*Expected an ESLint's CLIEngine options object \(<Object>\), but got 1 \(number\)\./,
		'should throw a type error when the second argument is not an object.'
	);

	t.throws(
		() => configuredESLintRules('test/test.js', {rules: {'eol-last': 3}}),
		/^Error.*CLI:\n\tConfiguration for rule "eol-last" is invalid/,
		'should throw an error when it takes an invalid ESLint config.'
	);

	t.throws(
		() => configuredESLintRules('_', {}, 1),
		/^RangeError.*Expected 0, 1 or 2 arguments \(\[<string>]\[, <Object>]\), but got 3 arguments\./,
		'should throw an error when it takes too many arguments.'
	);

	t.end();
});
