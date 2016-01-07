var webpack = require("webpack");

module.exports = {
  devtool: 'sourcemap',
  output: {
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel' },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.styl$/, loader: 'style!css!stylus' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.(eot|woff|woff2|svg|ttf)$/, loader: 'file-loader?name=fonts/[name].[ext]' },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]' },
      { test: /node_modules\/auth0-lock\/.*\.js$/, loaders: [
        'transform-loader/cacheable?brfs',
        'transform-loader/cacheable?packageify'
      ]},
      { test: /node_modules\/auth0-lock\/.*\.ejs$/, loader: 'transform-loader/cacheable?ejsify' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  plugins: [
      new webpack.ProvidePlugin({
          jQuery: 'jquery',
          $: 'jquery',
          'window.Auth0Lock': 'auth0-lock'
      })
  ]
};
