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
    historyApiFallback: true
    // open: true
  },
  devtool: 'eval-source-map'
});
