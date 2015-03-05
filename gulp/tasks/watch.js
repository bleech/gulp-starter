var gulp       = require("gulp");
var config     = require("../config");

gulp.task("watch", ["watchify", "browserSync"], function() {
  gulp.watch(config.styles.src, ["styles"]);
  gulp.watch(config.images.src, ["images"]);
  gulp.watch(config.templates.src, ["templates"]);
  gulp.watch(config.staticFiles.src, ["staticFiles"]);
});
