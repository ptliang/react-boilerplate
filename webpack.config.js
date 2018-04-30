const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/, // convert ES6 code to ES5 for compatibility
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/, // handle scss, convert to css and put in separate file
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/, // handle images, embed small ones
        use: {
          loader: "url-loader",
          options: {
            limit: 8000,
            name: "images/[name]-[hash].[ext]"
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "main.[contenthash].css",
      chunkFilename: "[id].css"

    }),
    new CleanWebpackPlugin('dist', {} ) // delete dist folder each time build is made
  ],
  devtool: 'source-map'
};
