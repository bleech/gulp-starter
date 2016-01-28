var path         = require('path');
var webpack      = require('webpack');
var browserSync  = require('browser-sync');
var logger       = require('../util/compileLogger');
var gulp         = require('gulp');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').general;

var paths = {
  dest: path.resolve(config.dest),
  src: path.resolve(config.src),
  root: path.resolve(config.root),
  publicPath: config.publicPath
};

var webpackServerConfig = require('../webpack/webpack.config.server')(paths, 'production');
var webpackBrowserConfig = require('../webpack/webpack.config.browser')(paths, 'production');

var webpackServerTask = function(callback) {
  webpack(webpackServerConfig, function(err, stats) {
    logger(err, stats)
    callback()
  });
};


var webpackBrowserTask = function(callback) {
  webpack(webpackBrowserConfig, function(err, stats) {
    logger(err, stats)
    callback()
  });
};

gulp.task('webpackBuild:server', webpackServerTask);
gulp.task('webpackBuild:browser', webpackBrowserTask);

gulp.task('webpackBuild', ['webpackBuild:server', 'webpackBuild:browser']);

// Exporting the task so we can call it directly in our watch task, with the 'devMode' option
module.exports = webpackBrowserTask;
