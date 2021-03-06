var gulp       = require("gulp");
var config     = require("../config").copy;
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');

var copyThis = function(bundleConfig) {
  var options = {dot: true};
  if(bundleConfig.base) options.base = bundleConfig.base
  return function() {
    return gulp.src(bundleConfig.src, options)
      .on('error', handleErrors)
      .pipe(gulp.dest(bundleConfig.dest))
      .pipe(browserSync.reload({stream:true}));
  };
};

Object.keys(config).forEach(function(key) {
  gulp.task('copy:' + key, copyThis(config[key]));
});

gulp.task('copy', Object.keys(config).map(function(key) { return 'copy:' + key }));
