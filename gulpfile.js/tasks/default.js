var gulp = require('gulp');

gulp.task('default', ['clean', 'bootstrap'], function() {
  return gulp.start(['data', 'coffeelint', 'images', 'copy', 'concat', 'watch']);
});
