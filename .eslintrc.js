module.exports = {
  root: true,
  extends: ['@react-native-community', 'eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'react-native/no-inline-styles': 0,
    'prettier/prettier': [
      'error',
      {
        'no-inline-styles': false,
        'react/react-in-jsx-scope': false,
      },
    ],
  },
};
