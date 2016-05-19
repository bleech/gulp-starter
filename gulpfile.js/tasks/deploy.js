var config, name, _fn;

var configObject    = require('../config').deploy;
var rsync = require('rsyncwrapper');
var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('deploy', Object.keys(configObject).map(function(name) {
  return "deploy:" + name;
}));

_fn = function(name, config) {
  return gulp.task("deploy:" + name, function() {
    return rsync({
      ssh: true,
      src: config.src,
      dest: config.dest,
      exclude: config.exclude,
      include: config.include,
      recursive: config.recursive,
      syncDestIgnoreExcl: config.syncDestIgnoreExcl,
      args: config.args || ['--verbose', '--copy-links'],
      "delete": false,
      deleteAll: false,
      onStdout: function(data) {
        return gutil.log(data);
      }
    }, function(error, stdout, stderr, cmd) {
      if (stdout) {
        gutil.log(stdout);
      }
      if (error) {
        return gutil.log(error, cmd);
      }
    });
  });
};
for (name in configObject) {
  config = configObject[name];
  _fn(name, config);
}
