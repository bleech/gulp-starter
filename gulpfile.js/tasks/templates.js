var gulp = require('gulp');
var jade = require('gulp-jade');
var jadePHP = require('gulp-jade-php');
var config = require('../config').templates;
var browserSync = require('browser-sync');
var locals = {};

gulp.task('templates', ['templates:HTML', 'templates:PHP']);

gulp.task('templates:HTML', function() {
  return gulp.src(config.HTML.src)
    .pipe(jade({
      locals: locals
    }))
    .pipe(gulp.dest(config.HTML.dest))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('templates:PHP', function() {
  return gulp.src(config.PHP.src)
    .pipe(jadePHP())
    .pipe(gulp.dest(config.PHP.dest))
    .pipe(browserSync.reload({stream:true}));
});
