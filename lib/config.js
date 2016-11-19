const prjDir = process.env.PWD;
const fs = require('fs');
const configPath = prjDir + '/mbuild.config.js';
let mconfig = {};
if(fs.existsSync(configPath)){
    mconfig = require(prjDir + '/mbuild.config.js');
}

const config = Object.assign({
  baseDir: prjDir,
  htmlDir: 'src',
  distDir: 'dist',
  timestmp: Date.now()
}, mconfig);

// babel
config.babel = Object.assign({
    presets: ['es2015']
}, mconfig.babel);

module.exports = config;