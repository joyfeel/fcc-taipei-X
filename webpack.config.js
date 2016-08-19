var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

const env = process.env.NODE_ENV

module.exports = {
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    // path.join(__dirname, 'public/js/index.js')
    path.join(__dirname, 'public/js/app.js')
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
    loaders: [{
      test: /\.(jpg|png|woff|woff2|eot|ttf|svg)(\?vhibso)?$/,
      loader: 'url-loader?limit=100000'
    },
    // {
    //   test: /\.scss$/,
    //   loader: 'style!css!autoprefixer!sass'
    // },
    {
      test: /\.[s]?css$/,
      loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'postcss'
      ]
    },
    // {
    //   test: /\.scss$/,
    //   loaders: [
    //     'style?sourceMap',
    //     'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
    //     'resolve-url',
    //     'sass?sourceMap'
    //   ]
    // },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  devtool: 'source-map',
  // devtool: 'cheap-module-eval-source-map',

  postcss: [
      require('postcss-nested'),
      require('postcss-cssnext')
  ]
}
