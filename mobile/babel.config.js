module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          'assets/*': './assets/*',
          'constant/*': './constant/*',
          'components/*': './components/*',
          'containers/*': './containers/*',
          'hooks/*': './hooks/*',
          'mocks/*': './mocks/*',
          'navigation/*': './navigation/*',
          'store/*': './store/*',
          'styles/*': './styles/*',
          'theme/*': './theme/*',
          'types/*': './types/*',
          'utils/*': './utils/*',
        },
      },
    ],
  ],
};
