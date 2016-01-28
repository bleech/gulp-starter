var gulp = require('gulp');
var runSequence = require('run-sequence');

// Run this to compress all the things!
gulp.task('production', function(cb){
  // This runs only if the karma tests pass
  return runSequence(['clean', 'bootstrap'],
  ['data', 'coffeelint', 'templates', 'images',  'copy','concat', 'webpackBuild'],
  ['rev'], cb);
});
