const merge = require('webpack-merge');
const commonConfig = require('./web/webpack/webpack.common');
const devConfig = require('./web/webpack/webpack.dev');
const prodConfig = require('./web/webpack/webpack.prod');

module.exports = (env) => {
  if (env.ENV === 'production') {
    return merge.smart(commonConfig(env), prodConfig(env));
  }
  return merge.smart(commonConfig(env), devConfig());
};
