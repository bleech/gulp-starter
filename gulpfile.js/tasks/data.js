var gulp         = require('gulp');
var cson         = require('gulp-cson');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').data;

gulp.task('data', function() {
  return gulp.src(config.src)
    .pipe(cson())
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
});
