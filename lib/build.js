const gulp = require('gulp');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const path = require("path");
const replace = require('gulp-replace');
const Util = require('./util');

const srcDir = Util.getConfig('srcDir');
const destDir = Util.getConfig('destDir');

module.exports = {
  buildJs: function (f, callback){
    callback = callback || function(){};
    const babelConfig = Util.getConfig('babel');
    gulp.src(f, {base: srcDir})
      .pipe(plumber())
      .pipe(babel(babelConfig))
      .pipe(gulp.dest(destDir))
      // .pipe(callback)
  },

  buildCss: function(f, callback){
    callback = callback || function(){};
    gulp.src(f, {base: srcDir})
      .pipe(plumber())
      .pipe(gulp.dest(destDir))
      // .pipe(callback)
  },

  buildHtml: function (f, callback){
    callback = callback || function(){};
    gulp.src(f, {base: srcDir})
      .pipe(plumber())
      .pipe(replace(/\.js/g, '.js?' + Util.getConfig('timestmp')))
      // .pipe(replace(/<!--footer-->[\s\S]*<!--footerend-->/, '<!--footer-->\n' + fs.readFileSync(srcDir + '_footer.html', 'utf-8') + '\n<!--footerend-->'))
      .pipe(gulp.dest(destDir))
      // .pipe(callback)
  },
  buildOther: function (f, callback){
    callback = callback || function(){};
    gulp.src(f, {base: srcDir})
      .pipe(plumber())
      .pipe(gulp.dest(destDir))
      // .pipe(callback)
  },
  files: function (f){
    // console.log('build:' + f);
    const extname = path.extname(f);
    switch(extname){
      case '.html':
        return this.buildHtml(f);
      case '.js':
        return this.buildJs(f);
      case '.css':
        return this.buildCss(f);
      default:
        this.buildOther(f);
    }
  }
}