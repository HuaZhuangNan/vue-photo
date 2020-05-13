const isPro = process.env.NODE_ENV === 'production';

module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-console': isPro ? 'warn' : 'off',
    'no-debugger': isPro ? 'warn' : 'off',
    'arrow-parens': ['error', 'as-needed'],
    'new-cap': 'off',
  }
};
