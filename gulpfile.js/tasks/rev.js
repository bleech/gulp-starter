var gulp         = require('gulp');
var RevAll       = require('gulp-rev-all');
var revNapkin    = require('gulp-rev-napkin');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').rev;

gulp.task('rev', function() {
  var revAll = new RevAll(config.settings)
  return gulp.src(config.src)
    .pipe(revAll.revision())
    .pipe(gulp.dest(config.dest))
    .pipe(revNapkin())
    .pipe(revAll.manifestFile())
    .pipe(gulp.dest(config.dest));
});
