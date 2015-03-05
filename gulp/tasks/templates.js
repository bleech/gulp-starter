var gulp = require('gulp');
var jade = require('gulp-jade');
var config = require('../config').templates;
var locals = {};

gulp.task('templates', function() {
  return gulp.src(config.src)
    .pipe(jade({
      locals: locals
    }))
    .pipe(gulp.dest(config.dest));
});
