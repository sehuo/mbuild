# mbuild cli

for mui build on hbuild

* browser-sync
* include for html file
* babel (default support ES2005)
* commonJs module

> notice: project in HBuild need base on destDir

## Install

```
npm i mbuild -D
```

## Usage

### scripts

```
// dev
./node_modules/.bin/mbuild

// build
./node_modules/.bin/mbuild build
```

### mbuild.config.js

* `destDir` default 'dist'

* `srcDir` default 'src'

* `concatGroup` {Object} Concatenate files that match minimatch-styled file globs

  ```
  concat: {
    'sub.js': ['xx/a.js', 'xx/b.js'],
    'sub.css': ['xx/a.css', 'xx/b.css'],
    'all.html': ['xx/a.html', 'xx/b.html', 'c.html']
  }
  ```

* `babel` {Object} See the Babel options https://babeljs.io/docs/usage/options/

  ```
  babel: {
      enabled: true, // default
      presets: ['es2015'],
      ignore: [
          'js/mui.min.js',
          'js/lib/*.js'
      ]
  },
  ```
* `commonJs` Bundles CommonJS modules for webview

  ```
  commonJs: {
    enabled: true, // default
    external: {
      mui: 'window.mui',
      jquery: 'window.jQuery',
    },
    ignore: [
      'page2/child/sub.js',
      'js/lib/*.js'
    ],
  },
  ```

### include
See https://github.com/coderhaoxin/gulp-file-include，prefix、suffix has changed

example

```
// header
<title>{@data.fb@}</title>

// a.html before
{@include('./layout/header.html', {
  "title": "首页",
  "data": {
    "fb": "facebook.com/include"
  }
})@}

// a.html after
<title>facebook.com/include</title>
```
