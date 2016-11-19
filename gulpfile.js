const gulp = require('gulp');
const rd = require("rd") ;
const path = require("path");
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
const concat = require('gulp-concat');
const group = require('gulp-group-files');
const replace = require('gulp-replace');
const del = require('del');
// const uglify = require('gulp-uglify');
// const swig = require('gulp-swig');

const Util = require('./lib/util');

const srcDir = Util.getConfig('srcDir');
const destDir = Util.getConfig('destDir');

const concatGroup = Util.getConfig('concatGroup');
const groupJS = concatGroup.js || [];
const groupCSS = concatGroup.css || [];

function buildJs(f){
  const babelConfig = Util.getConfig('babel');
  console.log(babelConfig.ignore);
  gulp.src(f, {base: srcDir})
    .pipe(plumber())
    .pipe(babel(babelConfig))
    .pipe(gulp.dest(destDir))
}

function buildCss(f){
  gulp.src(f, {base: srcDir})
    .pipe(plumber())
    .pipe(gulp.dest(destDir))
}

function buildOther(f){
  gulp.src(f, {base: srcDir})
    .pipe(plumber())
    .pipe(gulp.dest(destDir))
}

function buildHtml(f){
  gulp.src(f, {base: srcDir})
    .pipe(plumber())
    .pipe(replace(/\.js/g, '.js?' + Util.getConfig('timestmp')))
    // .pipe(replace(/<!--footer-->[\s\S]*<!--footerend-->/, '<!--footer-->\n' + fs.readFileSync(srcDir + '_footer.html', 'utf-8') + '\n<!--footerend-->'))
    .pipe(gulp.dest(destDir))
}

function buildFile(f){
  // console.log('build:' + f);
  const extname = path.extname(f);
  switch(extname){
    case '.html':
      return buildHtml(f);
    case '.js':
      return buildJs(f);
    case '.css':
      return buildCss(f);
    default:
      buildOther(f);
      // console.log('build other:' + f);;
  }
}

gulp.task('clean', function(cb) {
  del([destDir], {force: true}).then(() => {cb()});
});


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

gulp.task('build', function(callback) {
  runSequence('html',
              'concatGroupScript',
              'concatGroupCss',
              callback);
});

gulp.task('html', ['clean'], function(callback) {
  // rd.eachFileFilter(srcDir, /\.html$/, function (f, s, next) {
  rd.eachFile(srcDir, function (f, s, next) {
    buildFile(f);
    next();
  }, function (err) {
    if (err) throw err;
    setTimeout(callback, 5000);
  });
});

gulp.task('watch', ['html'] , function () {
  const watcher = gulp.watch([srcDir + '/**/*.*'], {} , function(e){
    if(e.type === 'changed'){
      buildFile(e.path);
    }
  });

  watcher.on('change', function(event) {
    if(event.type === 'deleted'){
      // console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    }
  });
});

gulp.task('default', ['watch']);