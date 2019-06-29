import {strict as assert} from 'assert';
import {join, parse} from 'path';
import {promises, unlinkSync} from 'fs';
import {tmpdir} from 'os';

import configuredESLintRules from '.';
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

test('use additional CLIEngine options as its last argument', () => {
	assert.deepEqual(configuredESLintRules({rules: {'no-alert': 2}}), ['no-alert', 'eol-last']);
});

test('return an empty array when `useEslintrc` option is enabled and no rules are specified', () => {
	assert.deepEqual(configuredESLintRules({useEslintrc: false}), []);
});

test('should throw an error when it cannot find any configuration', () => {
	const {root} = parse(process.cwd());

	process.chdir(parse(process.cwd()).root);
	assert.throws(() => configuredESLintRules(), {message: `No ESLint configuration found in ${root}.`});
});

test('throw a type error when it takes a non-object argument', () => {
	assert.throws(() => configuredESLintRules(true), {
		name: 'TypeError',
		message: 'Expected an ESLint\'s CLIEngine options object (<Object>), but got true (boolean).'
	});
});

test('throw an error when it takes too many arguments', () => {
	assert.throws(() => configuredESLintRules({}, {}), {
		name: 'RangeError',
		message: 'Expected 0 or 1 argument ([<Object>]), but got 2 arguments.'
	});
});
