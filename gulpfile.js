const gulp = require('gulp');
const rd = require("rd") ;
const path = require("path");
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');
// const swig = require('gulp-swig');
const replace = require('gulp-replace');
const del = require('del');
// 具体项目路径
const pwd = process.env.PWD;
const config = require('./lib/config');

const opts = Object.assign({
  htmlDir: 'src',
  distDir: 'dist',
  timestmp: Date.now()
}, config);

opts.htmlDir = path.join(pwd, opts.htmlDir);
opts.distDir = path.join(pwd, opts.distDir);

function buildJs(f){
  gulp.src(f, {base: opts.htmlDir})
    .pipe(plumber())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest(opts.distDir))
}

function buildCss(f){
  gulp.src(f, {base: opts.htmlDir})
    .pipe(plumber())
    .pipe(gulp.dest(opts.distDir))
}

function buildOther(f){
  gulp.src(f, {base: opts.htmlDir})
    .pipe(plumber())
    .pipe(gulp.dest(opts.distDir))
}

function buildHtml(f){
  gulp.src(f, {base: opts.htmlDir})
    .pipe(plumber())
    .pipe(replace(/\.js/g, '.js?' + opts.timestmp))
    // .pipe(replace(/<!--footer-->[\s\S]*<!--footerend-->/, '<!--footer-->\n' + fs.readFileSync(opts.htmlDir + '_footer.html', 'utf-8') + '\n<!--footerend-->'))
    .pipe(gulp.dest(opts.distDir))
}

function buildFile(f){
  console.log('build:' + f);
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
      console.log('build other:' + f);;
  }
}

gulp.task('clean', function(cb) {
  del([opts.distDir], {force: true}).then(() => {cb()});
});

gulp.task('concatScript', function (cb) {
  return gulp.src([
      opts.distDir + '/js/lib/zepto-1.2.0.min.js',
      opts.distDir + '/js/lib/juicer-v0.6.14.js',
      opts.distDir + '/config.js',
      opts.distDir + '/www/config.js',
      opts.distDir + '/js/common.js',
      opts.distDir + '/js/app.js',
      opts.distDir + '/js/lib/localforage.min.js'
    ])
    .pipe(concat('loads.js'))
    .pipe(gulp.dest( opts.distDir + '/js'));
});

gulp.task('weblogin', function (cb) {
  return gulp.src(opts.htmlDir + '/www/login.html')
    .pipe(plumber())
    .pipe(replace(/\.js/g, '.js?' + opts.timestmp))
    .pipe(gulp.dest( opts.distDir));
});

gulp.task('build', function(callback) {
  runSequence('html',
              // 'concatScript',
              callback);
});

gulp.task('html', ['clean'], function(callback) {
  // rd.eachFileFilter(opts.htmlDir, /\.html$/, function (f, s, next) {
  rd.eachFile(opts.htmlDir, function (f, s, next) {
    buildFile(f);
    next();
  }, function (err) {
    if (err) throw err;
    setTimeout(callback, 5000);
  });
});

gulp.task('watch', ['html'] , function () {
  const watcher = gulp.watch([opts.htmlDir + '/**/*.*'], {} , function(e){
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