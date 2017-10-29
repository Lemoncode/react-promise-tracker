module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: './lib/react-promise-tracker.js',
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