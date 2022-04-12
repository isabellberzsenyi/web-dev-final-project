module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'jsx-quotes': ['warn', 'prefer-single'],
    'react/jsx-one-expression-per-line': 'off',
  },
  overrides: [
    {
      files: ['*-test.js', '*.spec.js'],
      rules: {
        'react/jsx-filename-extension': 'off',
        'no-console': 'off',
      },
    },
  ],
};
