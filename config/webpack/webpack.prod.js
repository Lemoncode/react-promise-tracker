const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (env, argv) => merge(commonConfig(env, argv), {
  mode: 'production',
  devtool: 'none',
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
      reportFilename: "report/report.html",
    }),
    new CompressionPlugin(),
  ],
});
