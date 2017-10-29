var webpack = require('webpack');
var path = require('path');

const NODE_ENV = process.env.NODE_ENV;

const filename = `react-promise-tracker${NODE_ENV === 'production' ? '.min' : ''}.js`;

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename,
    library: 'ReactPromiseTracker',
    libraryTarget: 'umd',
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
