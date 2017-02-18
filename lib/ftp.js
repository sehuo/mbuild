const gulp = require('gulp');
const path = require('path');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');
const sftp = require('gulp-sftp');
const Util = require('./util');
const srcDir = Util.getConfig('srcDir');
const sftpConfig = Util.getConfig('sftp');

if(!sftpConfig) {
  console.error('Error, config sftp first!');
}

gulp.task('ftp', function() {
    return watch(srcDir + '/**', function(file) {
        console.log(`${file.event}: ${file.relative}`);
        if(file.event === 'unlink') return;
        gulp.src(path.resolve(srcDir, file.relative), {base: srcDir})
            .pipe(plumber())
            .pipe(sftp(sftpConfig))
    });
});
