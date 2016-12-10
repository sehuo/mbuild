const gulp = require('gulp');
const plumber = require('gulp-plumber');
const group = require('gulp-group-files');
const concat = require('gulp-concat');
const Util = require('./util');
const destDir = Util.getConfig('destDir');

const concatConfig = Util.getConfig('concat') || {};
gulp.task('concatFile', group(concatConfig, function(name, files){
  const nfs = Util.fixDestPath(files);
  return gulp.src(nfs)
        .pipe(plumber())
        .pipe(concat(name))
        .pipe(gulp.dest(destDir));
}));