const gulp = require('gulp');
const rd = require("rd");
const path = require("path");
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
const del = require('del');
const fileinclude = require('gulp-file-include');
// const uglify = require('gulp-uglify');
// const swig = require('gulp-swig');

const Util = require('./lib/util');
const build = require('./lib/build');

const srcDir = Util.getConfig('srcDir');
const destDir = Util.getConfig('destDir');

gulp.task('clean', function(cb) {
  del([destDir], {force: true}).then(() => {cb()});
});

gulp.task('build', function(callback) {
  runSequence('html', callback);
});

gulp.task('html', ['clean'], function(callback) {
  rd.eachFile(srcDir, function (f, s, next) {
    build.files(f, next);
  }, function (err) {
    if (err) throw err;
    callback();
  });
});

gulp.task('fileinclude', function(cb) {
  return gulp.src(destDir + '/**/*.html')
    .pipe(fileinclude({
      prefix: '{@',
      suffix: '@}',
      basepath: '@file'
    }))
    .pipe(gulp.dest(destDir));
});

gulp.task('build', function(callback) {
  runSequence('html',
              'fileinclude',
              callback);
});

gulp.task('watch', ['html'] , function () {
  const watcher = gulp.watch([srcDir + '/**/*.*'], {} , function(e){
    if(e.type === 'changed'){
      build.files(e.path);
    }
  });

  watcher.on('change', function(event) {
    if(event.type === 'deleted'){
      // console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    }
  });
});

gulp.task('default', ['watch']);