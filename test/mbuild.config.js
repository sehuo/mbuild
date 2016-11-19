module.exports = {
  concatGroup: {
    js: {
      'sub.js': ['index.js', 'page1/sub.js'],
      'all.js': ['index.js', 'page1/sub.js', 'page2/child/sub.js']
    }
  }
}