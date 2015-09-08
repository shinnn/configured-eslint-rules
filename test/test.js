'use strong';

const test = require('tape');
const configuredESLintRules = require('..');

test('configuredESLintRules()', t => {
  t.plan(8);

  t.strictEqual(configuredESLintRules.name, 'configuredESLintRules', 'should have a function name.');

  t.deepEqual(
    configuredESLintRules(),
    [],
    'should return an empty array when no rules are configured.'
  );

  t.deepEqual(
    configuredESLintRules('test/test.js'),
    ['eol-last'],
    'should retrieve configured rules for a given file.'
  );

  t.deepEqual(
    configuredESLintRules({rules: {'no-alert': 2}}),
    ['no-alert'],
    'should use additional CLIEngine options as its last argument.'
  );

  t.deepEqual(
    configuredESLintRules('test/test.js', {useEslintrc: false}),
    [],
    'should use both file name and CLIEngine option object.'
  );

  t.throws(
    () => configuredESLintRules(true),
    /TypeError.*true is not a string or an object/,
    'should throw a type error when the first argument is neither a string nor an object.'
  );

  t.throws(
    () => configuredESLintRules(null, {}),
    /TypeError.*null is not a string or an object/,
    'should throw a type error when the second argument is truthy but the first isn\'t.'
  );

  t.throws(
    () => configuredESLintRules('index.js', 1),
    /TypeError.*1 is not an object/,
    'should throw a type error when the second argument is not an object.'
  );
});
