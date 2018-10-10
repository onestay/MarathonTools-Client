module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': 'off',
    'no-tabs': 'off',
    'indent': ['error', 'tab'],
    'max-len': ['off', 100],
    'no-plusplus': 'off',
    'vue/html-indent': ['error', 'tab']
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
