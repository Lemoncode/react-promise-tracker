const helpers = require('./helpers');

module.exports = (env, argv) => {
  const minimizeBundle = Boolean(argv['optimize-minimize']);

  return {
    entry: ['./src/index.js'],
    output: {
      path: helpers.distPath,
      filename: helpers.getBundleFileName(minimizeBundle),
      library: helpers.packageNameCamelCase,
      libraryTarget: 'umd',
    },
    externals: {
      react: 'react',
    },
    optimization: {
      minimize: minimizeBundle,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
  };
};
