const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: "./src/index.tsx",
  target: "web",
  mode: "production",
  devtool:'source-map',
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  }
});
