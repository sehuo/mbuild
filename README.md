# mbuild cli

for mui build on hbuild

## Install

```
npm i mbuild -D
```

## Usage

## API

## mbuild.config.js

* `concatGroup` {Object} Concatenate files that match minimatch-styled file globs
  ```
  concatGroup: {
      js: {
        'sub.js': ['**/*.js', '!**/index.js'],
        'all.js': '**/*.js'
      }
    }
  ```
* `babel` {Object} See the Babel options https://babeljs.io/docs/usage/options/
  ```
  babel: {
        presets: ['es2015'],
        ignore: [
            'src/js/mui.min.js'
        ]
    },
  ```
