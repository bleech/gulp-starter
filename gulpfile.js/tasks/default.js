var gulp = require('gulp');

gulp.task('default', ['clean', 'bootstrap'], function() {
  return gulp.start(['coffeelint', 'styles', 'images', 'copy', 'concat', 'watch']);
});
