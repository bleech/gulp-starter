var gulp       = require("gulp");
var config     = require("../config");
var watch      = require('gulp-watch');

gulp.task("watch", ["webpackWatch", "browserSync"], function() {
  watch(config.styles.src, function() { gulp.start("styles"); });
  watch(config.images.src, function() { gulp.start("images"); });
  watch(config.templates.HTML.src, function() { gulp.start("templates:HTML"); });
  watch(config.templates.PHP.src, function() { gulp.start("templates:PHP"); });
  watch(config.coffeelint.src, function() { gulp.start('coffeelint'); });

  Object.keys(config.copy).forEach(function(key) {
    watch(config.copy[key].src, function() { gulp.start('copy:' + key); });
  });

  Object.keys(config.concat).forEach(function(key) {
    watch(config.concat[key].src, function() { gulp.start('concat:' + key); });
  });
});
