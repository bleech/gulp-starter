var gulp = require('gulp');

gulp.task('default', ['clean'], function() {
  return gulp.start(['coffeelint', 'styles', 'images', 'templates', 'copy', 'concat', 'watch']);
});
