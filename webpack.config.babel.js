import webpack from 'webpack';
import path from 'path';

const NODE_ENV = process.env.NODE_ENV;

const version = JSON.stringify(process.env.npm_package_version).replace(/"/g, '');
const filename = `react-promise-tracker-${version}${NODE_ENV === 'production' ? '.min' : ''}.js`;

export default {
  entry: ['./src/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename,
    library: {
      root: 'ReactPromiseTracker',
      amd: 'react-promise-tracker',
      commonjs: 'react-promise-tracker',
    },
    libraryTarget: 'umd',
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
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
