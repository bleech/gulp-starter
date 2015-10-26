var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

extractCss = new ExtractTextPlugin('[name].css');

module.exports = function(paths) {
  return {
    name: 'browser',
    devtool: 'eval',
    entry: {
      // vendor: ['jquery'],
      main: [path.join(paths.src, 'main.coffee')],
      // templates: './src/templates.coffee'
    },
    output: {
      path: paths.dest,
      filename: 'main.js'
    },
    module: {
      loaders: [
        { test: /\.coffee$/, loader: 'coffee-loader' },
        { test: /\.cson$/, loader: 'cson-loader' },
        { test: /\.jade$/, loader: 'jade-loader' },
        { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
        // { test: /\.styl$/, loader: extractCss.extract('css-loader!stylus-loader') },
        { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file?name=[path][hash].[ext]&context=src' }
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
    ]
  };
};
