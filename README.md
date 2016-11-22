# mbuild cli

for mui build on hbuild

## Install

```
npm i mbuild -D
```

## Usage

## mbuild.config.js

* `babel` {Object} See the Babel options https://babeljs.io/docs/usage/options/
  ```
  babel: {
        presets: ['es2015'],
        ignore: [
            'js/mui.min.js'
        ]
    },
  ```
* `commonJs` Bundles CommonJS modules for webview
  ```
  commonJs: {
    ignore: [
      'page2/child/sub.js'
    ],
  },
  ```

## include
See https://github.com/coderhaoxin/gulp-file-include，prefix、suffix has changed
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
  
