const baseDir = process.cwd();
const fs = require('fs');
const configPath = baseDir + '/mbuild.config.js';
let mconfig = {};
if(fs.existsSync(configPath)){
    mconfig = require(baseDir + '/mbuild.config.js');
}

const config = Object.assign({
  baseDir: baseDir, // __dirname
  htmlDir: 'src',
  distDir: 'dist',
  timestmp: Date.now()
}, mconfig);

module.exports = config;