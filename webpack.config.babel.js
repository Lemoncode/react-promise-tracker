import webpack from 'webpack';
import path from 'path';

const NODE_ENV = process.env.NODE_ENV;

const filename = `react-promise-tracker${NODE_ENV === 'production' ? '.min' : ''}.js`;

export default {
  entry: ['./src/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename,
    library: 'ReactPromiseTracker',
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
