const path = require('path');

module.exports = () => ({
  mode: 'development',

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
  },

  watch: true,
  devServer: {
    historyApiFallback: true,
    // open: true
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Methods': '*',
    //   'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    // }
    proxy: {
      '/api': 'http://localhost:3100'
    }
  },

  devtool: 'eval-source-map'
});
