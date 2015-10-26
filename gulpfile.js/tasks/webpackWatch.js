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
};

var webpackServerConfig = require('../webpack/webpack.config.server')(paths);
var webpackBrowserConfig = require('../webpack/webpack.config.browser')(paths);

var webpackServerTask = function(callback) {
  var initialCompile = false

  webpack(webpackServerConfig).watch(200, function(err, stats) {
    logger(err, stats)
    browserSync.reload()
    // On the initial compile, let gulp know the task is done
    if(!initialCompile) {
      initialCompile = true
      callback()
    }
  });
};


var webpackBrowserTask = function(callback) {
  var initialCompile = false

  webpack(webpackBrowserConfig).watch(200, function(err, stats) {
    logger(err, stats)
    browserSync.reload()
    // On the initial compile, let gulp know the task is done
    if(!initialCompile) {
      initialCompile = true
      callback()
    }
  });
};

gulp.task('webpackWatch:server', webpackServerTask);
gulp.task('webpackWatch:browser', webpackBrowserTask);

gulp.task('webpackWatch', ['webpackWatch:server', 'webpackWatch:browser']);

// Exporting the task so we can call it directly in our watch task, with the 'devMode' option
module.exports = webpackBrowserTask;
