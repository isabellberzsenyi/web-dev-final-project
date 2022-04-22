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
    'no-console': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': [0, { skipUndeclared: 'true' }],
    'object-curly-newline': [
      'off',
      {
        ImportDeclaration: { consistent: 'true' },
      },
    ],
    'react/jsx-no-constructed-context-values': 'off',
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
