const gulp = require('gulp');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
const babel = require('gulp-babel');
const path = require("path");
const replace = require('gulp-replace');
const webmake = require('gulp-webmake');
const fileinclude = require('gulp-file-include');
const Util = require('./util');

const srcDir = Util.getConfig('srcDir');
const destDir = Util.getConfig('destDir');
const babelConfig = Util.getConfig('babel');

gulp.task('cpfile', function(callback) {
  gulp.src(srcDir + '/**/*.*')
    .pipe(gulp.dest(destDir))
    .on('end', callback);
});

gulp.task('buildHtml', function(cb) {
  return gulp.src(destDir + '/**/*.html')
    .pipe(replace(/\.js/g, '.js?' + Util.getConfig('timestmp')))
    .pipe(fileinclude({
      prefix: '{@',
      suffix: '@}',
      basepath: '@file'
    }))
    .pipe(gulp.dest(destDir));
});

gulp.task('buildJs', function(callback) {
  runSequence('babelJs', 'commonJs', callback);
});

gulp.task('babelJs', function(callback) {
  gulp.src(destDir + '/**/*.js')
    .pipe(plumber())
    .pipe(babel(babelConfig))
    .pipe(gulp.dest(destDir))
    .on('end', callback);
});

gulp.task('commonJs', function(callback) {
  const ignoreJs = Util.getConfig('commonJs').ignore || [];
  const ignoreFiles = Util.fixDestPath(ignoreJs);
  const srcs = [destDir + '/**/*.js'];
  ignoreFiles.map(function(f){
    srcs.push('!' + f);
  });

  gulp.src(srcs, {base: destDir})
    .pipe(plumber())
    .pipe(webmake())
    .pipe(gulp.dest(destDir))
    .on('end', callback);
});

module.exports = {
  buildJs: function (f, callback){
    callback = callback || function(){};
    gulp.src(f, {base: srcDir})
      .pipe(plumber())
      .pipe(webmake())
      .pipe(babel(babelConfig))
      .pipe(gulp.dest(destDir))
      .on('end', callback);
  }
}