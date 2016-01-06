
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
       {test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]' }
    ]
  }
};
