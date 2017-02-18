const gulp = require('gulp');
const watch = require('gulp-watch');
const batch = require('gulp-batch');
const sftp = require('gulp-sftp');
const Util = require('./util');
const srcDir = Util.getConfig('srcDir');
const sftpConfig = Util.getConfig('sftp');

if(!sftp) {
  console.error('Error, config sftp first!');
}

gulp.task('ftp', function() {
  watch(srcDir + '/**.*', batch(function(events, done) {
    gulp.src(srcDir + '/**.*')
      .pipe(sftp(sftpConfig))
  }));
});