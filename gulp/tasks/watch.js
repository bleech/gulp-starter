var gulp       = require("gulp");
var config     = require("../config");

gulp.task("watch", ["watchify", "browserSync"], function() {
  gulp.watch(config.styles.src, ["styles"]);
  gulp.watch(config.images.src, ["images"]);
  gulp.watch(config.templates.HTML.src, ["templates:HTML"]);
  gulp.watch(config.templates.PHP.src, ["templates:PHP"]);
  gulp.watch(config.staticFiles.src, ["staticFiles"]);
});
