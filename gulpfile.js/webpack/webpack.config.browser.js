var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nib = require('nib');

extractCss = new ExtractTextPlugin('assets/styles/[name].css');

module.exports = function(paths, env) {
  var config = {
    name: 'browser',
    // devtool: 'eval',
    // devtool: 'cheap-module-eval-source-map',
    entry: {
      // vendor: ['jquery'],
      main: [path.join(paths.src, 'assets', 'scripts','main.coffee')],
      // templates: './src/templates.coffee'
    },
    output: {
      path: paths.dest,
      filename: 'assets/scripts/main.js',
      publicPath: paths.publicPath
    },
    module: {
      loaders: [
        { test: /\.coffee$/, loader: 'coffee-loader' },
        { test: /\.cson$/, loader: 'cson-loader' },
        { test: /\.jade$/, loader: 'jade-loader' },
        // { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
        { test: /app\.styl$/, loader: extractCss.extract('css-loader!autoprefixer-loader?browsers=last 10 versions!stylus-loader') },
        { test: /\.(jpe?g|png|gif|svg)(\?[a-z0-9]+)?$/i, loader: 'file?name=[path][name].[ext]&context=src' },
        { test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/, loader : 'file?name=[path][name].[ext]&context=src' }
      ]
    },
    resolve: {
      // you can now require('file') instead of require('file.coffee')
      extensions: ['', '.js', '.coffee'],
      modulesDirectories: ['node_modules', 'bower_components'],
      root: [
        path.join(paths.root, "bower_components"),
        path.join(paths.root, "src")
      ]
    },
    plugins: [
      new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
      ),
      // new HtmlWebpackPlugin(),
      // new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
      // new webpack.ProvidePlugin({
      //   $: "jquery",
      //   jQuery: "jquery",
      //   "window.jQuery": "jquery"
      // }),
      extractCss
    ],
    stylus: {
      use: [nib()],
      'include css': true
    }
  };
  if(env === 'production') {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.NoErrorsPlugin()
    );
    // config.output.publicPath = paths.publicPathProduction;
  }
  return config;
};
