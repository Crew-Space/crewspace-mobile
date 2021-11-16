module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'module-resolver',
    {
      root: ['.'],
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
        '~': './src',
        'assets/*': './srcassets/*',
        'components/*': './srccomponents/*',
        'hooks/*': './srchooks/*',
        'mocks/*': './srcmocks/*',
        'navigation/*': './srcnavigation/*',
        'screens/*': './srcscreens/*',
        'store/*': './srcstore/*',
        'styles/*': './srcstyles/*',
        'theme/*': './srctypes/*',
        'types/*': './srctypes/*',
        'utils/*': './srcutils/*',
      },
    },
  ],
};
