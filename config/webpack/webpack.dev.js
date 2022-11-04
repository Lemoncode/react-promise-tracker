const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = (env, argv) => merge(commonConfig(env, argv), {
  mode: 'development',
  devtool: 'eval-source-map',
});
