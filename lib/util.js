const pwd = process.env.PWD;
const path = require("path");
const config = require('./config');
const Util = {
  // 获取配置
  getConfig: function(k){
    return config[k];
  },
  // 从相对srcDir路径转成绝对路径
  fixPath : function(files, dir) {
    const nfs = [].concat(files);
    nfs.map(function(f, i){
      nfs[i] = path.join(dir, f);
    });
    return nfs;
  },
  fixDestPath: function(files){
    return this.fixPath(files, config.destDir)
  },
  fixSrcPath: function(files){
    return this.fixPath(files, config.srcDir)
  }
}

if(config.babel.ignore){
  config.babel.ignore = Util.fixDestPath(config.babel.ignore);
}

module.exports = Util;