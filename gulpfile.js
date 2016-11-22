const gulp = require('gulp');
const rd = require("rd");
const path = require("path");
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
const del = require('del');
const watch = require('gulp-watch');
const batch = require('gulp-batch');
// const uglify = require('gulp-uglify');
// const swig = require('gulp-swig');

const Util = require('./lib/util');
const build = require('./lib/build');

const srcDir = Util.getConfig('srcDir');
const destDir = Util.getConfig('destDir');

gulp.task('clean', function(cb) {
  del([destDir + '/*'], {force: true}).then(() => {cb()});
});

gulp.task('build', ['clean'], function(callback) {
  runSequence('cpfile', ['buildHtml','buildJs'], callback);
});

gulp.task('watch', ['build'] , function () {
  watch(srcDir + '/**/*.js', batch(function (events, done) {
    const srcs = events._list.map(function(file){
      console.log(`${file.event}: ${file.relative}`);
      return srcDir + '/' + file.relative;
    });

    gulp.src(srcs)
      .pipe(gulp.dest(destDir))
      .on('end', function(){
        gulp.start('buildJs', done);
      });
  }));
});

gulp.task('default', ['watch']);