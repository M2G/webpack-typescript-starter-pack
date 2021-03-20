const webpack = require('webpack');
const resolve = require('resolve')
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const paths = require("./paths");

const publicPath = '/';

const plugins = [
  new ManifestPlugin({
    fileName: 'manifest.json',
    publicPath: publicPath,
    generate: (seed, files) => {
      const manifestFiles = files.reduce((manifest, file) => {
        manifest[file.name] = file.path;
        return manifest;
      }, seed);

      return {
        files: manifestFiles,
      };
    },
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new ForkTsCheckerWebpackPlugin({
    eslint: {
      files: './src/**/*.{ts,tsx,js,jsx}' // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
    }
  }),
          new ESLintPlugin({
          // Plugin options
          extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
          eslintPath: require.resolve('eslint'),
          emitWarning: true,
          context: paths.appSrc,
          cache: true,
          cacheLocation: path.resolve(
            paths.appNodeModules,
            '.cache/.eslintcache'
          ),
          // ESLint class options
          cwd: paths.appPath,
          resolvePluginsRelativeTo: __dirname,
          baseConfig: {
            extends: [require.resolve('eslint-config-airbnb-base')],
          },
        }),
];

module.exports = plugins;
