import merge from "webpack-merge";
import common from "./webpack.config.babel.js";
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

module.exports = merge(common, {
  devtool: "inline-source-map"
});
