var gulp       = require("gulp");
var config     = require("../config").staticFiles;

gulp.task("staticFiles", function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
