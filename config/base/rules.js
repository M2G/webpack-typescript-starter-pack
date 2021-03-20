const paths = require('./paths');

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || 10000
);

const tsLoader = {
  test: /\.(ts)$/,
  include: paths.appSrc,
  use: [
    {
      loader: require.resolve('ts-loader'),
      options: {
        transpileOnly: true
      }
    },
  ],
};

const jsLoaderRule = {
  test: /\.(js)$/,
  include: paths.appSrc,
  use: [{
    loader: require.resolve('babel-loader'),
    options: {
      cacheDirectory: true
    }
  }]
};

const filesLoaderRule = {
  test: /.(png|svg|jpe?g|gif|ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
  use: [{
    loader: require.resolve('file-loader'),
    options: {
      name(file) {
        if (process.env.NODE_ENV === 'development') {
          return '[path][name].[ext]';
        }

        return '[contenthash].[ext]';
      },
    },
  }]
};

const rules = [
  jsLoaderRule,
  tsLoader,
  filesLoaderRule,
];

module.exports = rules;
