'use strict';

const {join, parse} = require('path');
const {mkdir, writeFile} = require('fs').promises;

const configuredESLintRules = require('.');
const rmfr = require('rmfr');
const test = require('tape');

const tmp = join(__dirname, 'tmp');

test('configuredESLintRules()', async t => {
	await mkdir(tmp);
	await writeFile(join(tmp, '.eslintrc.yml'), `root: true
rules:
  eol-last: 0
`);

	process.chdir(tmp);

	t.deepEqual(
		configuredESLintRules(),
		['eol-last'],
		'should retrieve configured rules for a given file.'
	);

	t.deepEqual(
		configuredESLintRules({rules: {'no-alert': 2}}),
		['eol-last', 'no-alert'],
		'should use additional CLIEngine options as its last argument.'
	);

	t.deepEqual(
		configuredESLintRules({useEslintrc: false}),
		[],
		'should return an empty array when `useEslintrc` option is enabled and no rules are specified.'
	);

	await rmfr(tmp);
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
		() => configuredESLintRules({}, {}),
		/^RangeError: Expected 0 or 1 argument \(\[<Object>]\), but got 2 arguments\./,
		'should throw an error when it takes too many arguments.'
	);

	t.end();
});
