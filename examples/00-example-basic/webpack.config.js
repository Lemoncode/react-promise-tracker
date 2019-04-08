var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

var path = require("path");
var basePath = __dirname;

module.exports = {
  context: path.join(basePath, "src"),
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom')
    },
  },
  entry: {
    app: "./index.jsx",
    vendor: ["react", "react-dom"],
  },
  output: {
    filename: "[name].[chunkhash].js"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          name: "vendor",
          test: "vendor",
          enforce: true
        }
      }
    }
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html", //Name of file in ./dist/
      template: "index.html", //Name of template in ./src
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
