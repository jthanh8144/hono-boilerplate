module.exports = {
  root: true,
  env: {
    es2023: true,
  },
  extends: [
    'eslint:recommended',
    'standard-with-typescript',
    'plugin:@typescript-eslint/recommended-type-checked',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
  },
  plugins: [
    'simple-import-sort',
    'deprecation',
    '@typescript-eslint',
    '@typescript-eslint/eslint-plugin',
  ],
  rules: {
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'import/newline-after-import': 'error',
    'deprecation/deprecation': 'warn',
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
  },
  ignorePatterns: ['.eslintrc.js'],
}
