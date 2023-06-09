module.exports = {
  globals: {
    server: true,
    $: true,
    moment: true,
    Spreedly: true
  },
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    browser: true,
    "es6": true
  },
  rules: {
    "no-unused-vars": ["warn", { "args": "none" }],
    "no-console": "off"
  }
};
