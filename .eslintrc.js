module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 10,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-extra-semi': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/triple-slash-reference': 0,
  },
}
