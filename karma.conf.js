var webpack = require("webpack");

module.exports = function (config) {
  config.set({
    // base path used to resolve all patterns
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files/patterns to load in the browser
    files: [{ pattern: 'spec.bundle.js', watched: false }],

    // files to exclude
    exclude: [],

    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-spec-reporter"),
      require("karma-sourcemap-loader"),
      require("karma-webpack")
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: { 'spec.bundle.js': ['webpack', 'sourcemap'] },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.js/, exclude: [/app\/lib/, /node_modules/], loader: 'babel' },
          { test: /\.html/, loader: 'raw' },
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
    },

    webpackServer: {
      noInfo: true // prevent console spamming when running in Karma!
    },

    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'],

    // web server port
    port: 9876,

    // enable colors in the output
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // toggle whether to watch files and rerun tests upon incurring changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // if true, Karma runs tests once and exits
    singleRun: false
  });
};
