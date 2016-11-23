const gulp = require('gulp');
const watch = require('gulp-watch');
const batch = require('gulp-batch');
const Util = require('./util');
const srcDir = Util.getConfig('srcDir');
const destDir = Util.getConfig('destDir');

gulp.task('watch', [ 'build' ], function() {
  watch(srcDir + '/**/*.js', batch(function(events, done) {
    const srcs = events._list.map(function(file) {
      console.log(`${file.event}: ${file.relative}`);
      return srcDir + '/' + file.relative;
    });

    gulp.src(srcs, { base: srcDir })
      .pipe(gulp.dest(destDir))
      .on('end', function() {
        gulp.start('buildJs', done);
      });
  }));

  watch(srcDir + '/**/*.html', batch(function(events, done) {
    const srcs = events._list.map(function(file) {
      console.log(`${file.event}: ${file.relative}`);
      return srcDir + '/' + file.relative;
    });
    gulp.src(srcs, { base: srcDir })
      .pipe(gulp.dest(destDir))
      .on('end', function() {
        gulp.start('buildHtml', done);
      });
  }));
});
