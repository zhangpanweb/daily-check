## common-react-boilerplate

A react project template containing the common configures.

With my personal study, this project will be completed gradually.

#### supported

- JavaScript and React 
  - jsx syntax
  - use babel to convert es6 to es5
- css
  - support less
- dev functionality
  - serve by webpack-dev-server
  - live reload when change files
  - using webpack watch to support auto bundle when file changed
  - souce map


## add to common-react-config

- add file-loader to deal with images
- add 'npm run build-analyze' script (distinguish from 'npm run build')
- add 'common' cacheGroup


## project to do
- 统一的错误处理 toast ，以及对请求的统一错误处理
- 手机调试，样式更改
- 合并inputModal和confirmModal
- 由于moment打包过于大，重写或者替换掉moment

## to be fixed
线上，未登录，不会重定向到login，而是 to login
