const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const envToBeInjected = env => {
  if (env && env.alpha) {
    // alpha platform for internal test
    return {
      DEPLOY_SITE: 'https://alphameet.herokuapp.com',
      FACEBOOK_ID: 1864803740472245,
      GOOGLE_ID: '524481294139-rvv77r2csqbn9ejpogusb4n2sf5pifn2.apps.googleusercontent.com',
      GITHUB_ID: '5e34d085495d6d882a5e',
    }
  } else {
    // formal platform
    return {
      DEPLOY_SITE: 'https://atmeet.herokuapp.com',
      FACEBOOK_ID: 714795635361315,
      GOOGLE_ID: '524481294139-03nll8r7ohb5hnb94m89jdtj8b319svc.apps.googleusercontent.com',
      GITHUB_ID: '31b61d31f73d89b7eacc',
    }
  }
}

module.exports = function(env) {
  return {
    entry: path.join(__dirname, 'public', 'js', 'index.js'),
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist'),
      publicPath: './',
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
              'css-loader',
              'postcss-loader',
              'sass-loader'
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
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(envToBeInjected(env)),
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ]
  }
}
