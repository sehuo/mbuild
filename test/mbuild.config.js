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
  }
};
