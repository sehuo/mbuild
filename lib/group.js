const gulp = require('gulp');
const group = require('gulp-group-files');
const concat = require('gulp-concat');
const Util = require('./util');

const srcDir = Util.getConfig('srcDir');
const destDir = Util.getConfig('destDir');
const concatGroup = Util.getConfig('concatGroup');
const groupJS = concatGroup.js || [];
const groupCSS = concatGroup.css || [];
const groupOther = concatGroup.other || [];

gulp.task('concatGroupScript', group(groupJS, function(name,files){
  const nfs = Util.fixDestPath(files);
  return gulp.src(nfs)
          .pipe(concat(name))
          .pipe(gulp.dest(destDir));
}));
gulp.task('concatGroupCss', group(groupCSS, function(name,files){
  const nfs = Util.fixDestPath(files);
  return gulp.src(nfs)
          .pipe(concat(name ))
          .pipe(gulp.dest(destDir));
}));

gulp.task('concatGroupOther', group(groupOther, function(name,files){
  const nfs = Util.fixDestPath(files);
  return gulp.src(nfs)
          .pipe(concat(name ))
          .pipe(gulp.dest(destDir));
}));

