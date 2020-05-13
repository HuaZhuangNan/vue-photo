const isPro = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': isPro ? 'warn' : 'off',
    'no-debugger': isPro ? 'warn' : 'off',
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    'arrow-parens': ["error", "as-needed"],
    'func-names': ["error", "as-needed"], // 主要用到 vue的watch
    // https://github.com/benmosher/eslint-plugin-import/blob/v2.20.2/docs/rules/no-unresolved.md
    'import/no-unresolved': [2,{ caseSensitive: false }],
    'import/extensions': ['error', 'always', { js: 'never', ts: 'never', tsx: 'never', vue: 'never' }]
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
