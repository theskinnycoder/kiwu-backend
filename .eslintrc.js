module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  parser: '@babel/eslint-parser',
  plugins: ['prettier'],
  rules: {
    'no-return-await': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'prettier/prettier': 'off',
    'no-unused-vars': 'off',
  },
};
