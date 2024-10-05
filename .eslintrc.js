module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    plugins: ['@typescript-eslint'],
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  };
  