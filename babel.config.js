module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          app: './src/App',
          'moti/skeleton': 'moti/skeleton/react-native-linear-gradient',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
