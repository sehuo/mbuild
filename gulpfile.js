const gulp = require('gulp');
const del = require('del');
// const uglify = require('gulp-uglify');
// const swig = require('gulp-swig');
require('./lib/build');
require('./lib/watch');
require('./lib/ftp');

const Util = require('./lib/util');
const destDir = Util.getConfig('destDir');

gulp.task('clean', function(cb) {
  del([ destDir + '/*' ], { force: true }).then(() => { cb(); });
});

gulp.task('default', [ 'watch' ]);