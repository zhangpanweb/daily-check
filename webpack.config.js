const merge = require('webpack-merge');
const commonConfig = require('./webpack/webpack.common');
const devConfig = require('./webpack/webpack.dev')();
const prodConfig = require('./webpack/webpack.prod')();

module.exports = (env) => {
  if (env.ENV === 'production') {
    return merge.smart(commonConfig(env), prodConfig);
  }
  return merge.smart(commonConfig(env), devConfig);
};
