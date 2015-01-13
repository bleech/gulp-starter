gulp = require 'gulp'
stylus = require 'gulp-stylus'
nib = require 'nib'
handleErrors = require '../util/handleErrors'
config = require('../config').styles
sourcemaps = require 'gulp-sourcemaps'

gulp.task 'styles', ['images'], ->
  gulp.src(config.src)
  .pipe(sourcemaps.init())
  .pipe(stylus(
    use: nib(),
    compress: true
  ))
  .pipe(sourcemaps.write())
  .on('error', handleErrors)
  .pipe gulp.dest(config.dest)
