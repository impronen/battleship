module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['some-other-config-you-use', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
  },
};
