var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

extractCss = new ExtractTextPlugin('[name].css');

module.exports = function(paths) {
  var BleechStackWebpackPlugin = require(path.join(paths.root, 'plugins', 'bleech-stack-webpack-plugin'));
  return {
    name: 'server',
    entry: {
      server: [path.join(paths.src, 'server.coffee')],
    },
    target: 'node',
    output: {
      path: paths.dest,
      filename: 'server.js',
      libraryTarget: 'umd'
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
      new BleechStackWebpackPlugin('server', path.join(paths.src, 'routes.cson'), {}),
      extractCss
    ],
    // devServer: {
    //   inline: false
    // }
  };
};
