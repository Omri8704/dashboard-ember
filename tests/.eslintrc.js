module.exports = {
  env: {
    'embertest': true
  },
  globals: {
    server: true,
    $: true,
  },
  'no-console': "allow",
  rules: {
    "no-unused-vars": ["warn", { "args": "none" } ]
  }

};
