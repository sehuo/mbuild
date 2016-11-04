const gulp = require('gulp');

module.exports = function () {
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
}