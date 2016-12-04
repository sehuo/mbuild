const gulp = require('gulp');
const watch = require('gulp-watch');
const batch = require('gulp-batch');
const Util = require('./util');
const srcDir = Util.getConfig('srcDir');
const destDir = Util.getConfig('destDir');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

// const clc = require('cli-color');

gulp.task('watch', [ 'build' ], function() {

  browserSync.init({
    server: {
      baseDir: destDir,
      directory: true,
    },
    port: '8000',
    ui: false,
    ghostMode: false,
    logLevel: 'info',
    // 日志前缀
    logPrefix: 'mbuild',
    // 不记录文件更改
    logFileChanges: false,
    logSnippet: false,
    // 不显示在浏览器中的任何通知。
    notify: false,
    // 视口同步到顶部位置
    scrollProportionally: false,
  });

  gulp.watch([ destDir + '/**/*.html', destDir + '/**/*.js' ]).on('change', reload);

  watch(srcDir + '/**/*.js', batch(function(events, done) {
    // const srcs = [];
    // events._list.forEach(function(file) {
    //   console.log(`${file.event}: ${file.relative}`);
    //   if(file.event !== 'unlink'){
    //     srcs.push(srcDir + '/' + file.relative)
    //   }
    // });
    // if(!srcs.length) return;
    gulp.src(srcDir + '/**/*.js')
      .pipe(gulp.dest(destDir))
      .on('end', function() {
        gulp.start('buildJs', function() {
          done();
        });
      });
  }));

  watch(srcDir + '/**/*.html', batch(function(events, done) {
    // const srcs = [];
    // events._list.forEach(function(file) {
    //   console.log(`${file.event}: ${file.relative}`);
    //   if(file.event !== 'unlink'){
    //     srcs.push(srcDir + '/' + file.relative)
    //   }
    // });
    // if(!srcs.length) return;
    gulp.src(srcDir + '/**/*.html')
      .pipe(gulp.dest(destDir))
      .on('end', function() {
        gulp.start('buildHtml', function() {
          done();
        });
      });
  }));
});

