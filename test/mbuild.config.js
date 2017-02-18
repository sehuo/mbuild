module.exports = {
  babel: {
    ignore: [
      'page1/sub.js',
    ],
  },
  commonJs: {
    external: {
      mui: 'window.mui',
      jquery: 'window.jQuery',
    },
    ignore: [
      'page2/child/sub.js',
    ],
  },
  concat: {
    'sub.js': ['index.js', 'page1/sub.js']
  },
  sftp: {
    host: 'website.com',
    user: 'johndoe',
    pass: '1234',
    port: '22',
    remotePath: '/',
    remotePlatform: 'unix',
    key: null,
    passphrase: null,
    keyContents: null,
    auth: null,
    authFile: '.ftppass',
    callback: null,
    timeout: 10000
  },
};
