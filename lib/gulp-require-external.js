'use strict';

const Transform = require('readable-stream/transform');
const rs = require('replacestream');
const istextorbinary = require('istextorbinary');

module.exports = function(search, replacement) {
  return new Transform({
    objectMode: true,
    transform(file, enc, callback) {
      if (file.isNull()) {
        return callback(null, file);
      }

      function doReplace() {
        if (file.isStream()) {
          for(var i in search){
            const reg = new RegExp('\\brequire\\([\'|\"]' + i + '[\"|\']\\)', 'g');
            file.contents = file.contents.pipe(rs(reg, search[i]));
          }
          return callback(null, file);
        }

        if (file.isBuffer()) {
          let contents = String(file.contents);
          for(var i in search){
            const reg = new RegExp('\\brequire\\([\'|\"]' + i + '[\"|\']\\)', 'g');
            contents = contents.replace(reg, search[i]);
          }
          file.contents = new Buffer(contents);
          
          return callback(null, file);
        }
        callback(null, file);
      }

      istextorbinary.isText(file.path, file.contents, function(err, result) {
        if (err) {
          return callback(err, file);
        }

        if (!result) {
          callback(null, file);
        } else {
          doReplace();
        }
      });
    },
  });
};
