var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * This webpack config defines loaders to support for:
 * Babel, for ES6 and React (JSX)
 * CSS/SCSS + Autoprefixing for browser support
 * Fonts (ttf, woff, woff2, eot) using url loader
 * Images (jpe/jpeg/png/gif/tiff/svg)
 *
 * It outputs a bundle.js and style.css for the resulting JS and CSS respectively to be sent
 * to the browser.
 */

var config = {
  entry: path.join(__dirname, 'app/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader!postcss-loader!sass-loader'
        }),
        test: /\.(css|scss)$/,
        exclude: /node_modules/
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test:  /\.(jpe?g|png|gif|tiff|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 40000}
          },
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
};

module.exports = config;
