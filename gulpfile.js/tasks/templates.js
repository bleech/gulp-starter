var gulp = require('gulp');
var jade = require('gulp-jade');
var data = require('gulp-data');
var jadePHP = require('gulp-jade-php');
var config = require('../config').templates;
var browserSync = require('browser-sync');
var CSON = require('cson');
var merge = require('merge');
var path = require('path');
var fs = require('fs');

var getData = function(file) {
  var globalData = merge.apply(null, config.dataFiles.map(loadFileFromBasename))
  var templateData = loadFile(file)
  return merge(globalData, templateData)
}

var loadFileFromBasename = function(basename) {
  var dataPath = path.resolve(config.dataPath, basename + '.cson')
  if(fs.existsSync(dataPath)) {
    return CSON.load(dataPath)
  } else {
    return {}
  }
}

var loadFile = function(file) {
  return loadFileFromBasename(path.basename(file.path, '.jade'))
}

gulp.task('templates', ['templates:HTML', 'templates:PHP']);

gulp.task('templates:HTML', function() {
  return gulp.src(config.HTML.src)
    .pipe(data(getData))
    .pipe(jade())
    .pipe(gulp.dest(config.HTML.dest))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('templates:PHP', function() {
  return gulp.src(config.PHP.src)
    .pipe(data(getData))
    .pipe(jadePHP())
    .pipe(gulp.dest(config.PHP.dest))
    .pipe(browserSync.reload({stream:true}));
});
