module.exports = {
  root: true,
  extends: [
    '@react-native',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[jt]s?(x)',
        'jest.setup.js',
      ],
      env: {
        jest: true,
      },
      extends: ['plugin:jest/recommended'],
    },
  ],
};