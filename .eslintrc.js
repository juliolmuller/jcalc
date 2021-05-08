/* eslint-env node */
module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
  },
  extends: [
    'lacussoft',
  ],
  ignorePatterns: [
    'dist/',
    'public/',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 'off',
    'no-magic-numbers': ['error', { ignore: [-1, 0, 1, 2, 3, 100, 1000] }],
    'no-param-reassign': 'off',
  },
}
