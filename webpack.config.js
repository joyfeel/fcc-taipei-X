var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    path.join(__dirname, 'public/js/index.js')
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public', 'dest'),
    publicPath: '/dest/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.(jpg|png|woff|woff2|eot|ttf|svg)(\?vhibso)?$/,
      loader: 'url-loader?limit=100000'
    },
    {
      test: /\.scss$/,
      loader: 'style!css!autoprefixer!sass'
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  devtool: "cheap-module-eval-source-map"
}
