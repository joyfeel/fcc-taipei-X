const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    path.join(__dirname, 'public', 'js', 'index.js'),
    'whatwg-fetch',
    'babel-polyfill',
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public', 'dest'),
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            'css-loader?sourceMap',
            'postcss-loader',
            'sass-loader?sourceMap',
          ],
        }),
        test: /\.(css|sass|scss)$/,
      },
      {
        use: [
          {
            loader: 'url-loader',
            options: { limit: 40000 },   // 小於 40 kb，會被縮成 base64url (raw data)，大於 40kb 則是一般圖片檔
          },
          'image-webpack-loader'
        ],
        test: /\.(jpe?g|png|gif|svg|woff|woff2|ttf|eot|svg)$/,
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devtool: 'source-map'
}
