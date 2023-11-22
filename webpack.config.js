const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jp(e*)g|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "img/[name][ext][query]",
        }
      },
      {
        test: /\.less$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
          },
        ],
      },
    ],
  },
  plugins: isProduction ? [new MiniCssExtractPlugin()] : []
};