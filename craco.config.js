const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter((plugin) => !(plugin instanceof ModuleScopePlugin));
          webpackConfig.plugins.push(new NodePolyfillPlugin());

          return webpackConfig;
        },
      },
    },
    {
      plugin: require('craco-alias'),
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
};
