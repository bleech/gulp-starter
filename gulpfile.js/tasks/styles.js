var gulp         = require('gulp');
var stylus       = require('gulp-stylus');
var nib          = require('nib');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').styles;
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', ['images'], function() {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(stylus(config.settings))
    .on('error', handleErrors)
    .pipe(autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest));
});
