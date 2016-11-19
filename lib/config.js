// ios + window
const prjDir = process.env.PWD || process.env.INIT_CWD;
const path = require("path");
const fs = require('fs');
const configPath = prjDir + '/mbuild.config.js';

let _config = {};
if(fs.existsSync(configPath)){
    _config = require(prjDir + '/mbuild.config.js');
}

const config = Object.assign({
  srcDir: 'src',
  destDir: 'dist',
  timestmp: Date.now(),
  concatGroup: {}
}, _config);

// 数据订正
config.srcDir = path.join(prjDir, config.srcDir);
config.destDir = path.join(prjDir, config.destDir);

// babel
config.babel = Object.assign({
    presets: ['es2015']
}, config.babel);

module.exports = config;