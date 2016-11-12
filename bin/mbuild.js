#!/usr/bin/env node
const path = require('path');
// 移除参数，以免gulp把它当成任务id
process.argv.splice(2, 1);
// 增加--gulpfile参数
process.argv.push(
    '--gulpfile',
    // __dirname是全局变量，表示当前文件所在目录
    path.resolve(__dirname, '../gulpfile.js')
);

require('gulp/bin/gulp');