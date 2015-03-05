var gulp = require('gulp');

gulp.task('default', ['clean'], function() {
  return gulp.start(['styles', 'images', 'templates', 'staticFiles', 'watch']);
});
