var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

const env = process.env.NODE_ENV

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
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new webpack.ProvidePlugin({
        'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.[s]?css$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'postcss'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.woff(2)?(\?[a-z0-9]+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      }
    ]
  },
  devtool: 'source-map',
  // devtool: 'cheap-module-eval-source-map',
  postcss: [
    require('postcss-nested'),
    require('postcss-cssnext')
  ]
}
