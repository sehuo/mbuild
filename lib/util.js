const path = require('path');
const config = require('./config');
const Util = {
  // 获取配置
  getConfig(k) {
    return config[k];
  },
  // 从相对srcDir路径转成绝对路径
  fixPath(files, dir) {
    const nfs = [].concat(files);
    nfs.forEach((f, i) => {
      nfs[i] = path.join(dir, f);
    });
    return nfs;
  },
  fixDestPath(files) {
    return this.fixPath(files, config.destDir);
  },
  fixSrcPath(files) {
    return this.fixPath(files, config.srcDir);
  },
};

if (config.babel.ignore) {
  config.babel.ignore = Util.fixDestPath(config.babel.ignore);
}

module.exports = Util;
