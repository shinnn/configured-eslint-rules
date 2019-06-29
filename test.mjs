import {strict as assert} from 'assert';
import {join, parse} from 'path';
import {promises, unlinkSync} from 'fs';
import {tmpdir} from 'os';

import configuredESLintRules from '.';
import eslint from 'eslint';
import test from 'testit';

const tmpDir = tmpdir();
const tmpFile = join(tmpDir, '.eslintrc.yml');

process.chdir(tmpDir);
process.on('exit', () => unlinkSync(tmpFile));

test('retrieve configured ESLint rules', async () => {
	await promises.writeFile(tmpFile, `root: true
rules:
  eol-last: 0
`);

	assert.deepEqual(configuredESLintRules(), ['eol-last']);
});

test('use a passed CLIEngine options object', () => {
	assert.deepEqual(configuredESLintRules({rules: {'no-alert': 2}}), ['no-alert', 'eol-last']);
});

test('use a passed CLIEngine', () => {
	assert.deepEqual(configuredESLintRules(new eslint.CLIEngine({useEslintrc: false})), []);
});

test('should throw an error when it cannot find any configuration', () => {
	const {root} = parse(process.cwd());

	process.chdir(parse(process.cwd()).root);
	assert.throws(() => configuredESLintRules(), {message: `No ESLint configuration found in ${root}.`});
});

test('throw a type error when it takes an argument neither a CLIEngine nor a plain object', () => {
	assert.throws(() => configuredESLintRules(true), {
		name: 'TypeError',
		code: 'ERR_INVALID_ARG_TYPE',
		message: 'Expected an ESLint\'s CLIEngine instance or a plain object to set CLIEngine options, but got true (boolean).'
	});
});

test('throw an error when it takes too many arguments', () => {
	assert.throws(() => configuredESLintRules({}, {}), {
		name: 'RangeError',
		code: 'ERR_TOO_MANY_ARGS',
		message: 'Expected 0 or 1 argument (<Object|CLIEngine>), but got 2 arguments.'
	});
});
