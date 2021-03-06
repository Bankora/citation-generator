module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'global-require': 0,
    'import/no-default-export': 'off',
    'import/prefer-default-export': 'off',
    'linebreak-style': 0,
    'max-len': ["error", { "code": 170 }]
  },
};
