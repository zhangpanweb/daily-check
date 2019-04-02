const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => ({
  entry: {
    app: path.resolve(__dirname, '../entry/index.jsx'),
    vendors: path.resolve(__dirname, '../entry/vendors.jsx')
  },

  resolve: {
    extensions: ['.jsx', '.js']
  },

  module: {
    rules: [
      {
        test: [/.js$/, /.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.less$/,
        use: [{
          loader: (env.ENV === 'development') ? 'style-loader' : MiniCssExtractPlugin.loader
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader'
        }]
      }, {
        test: /\.css$/,
        use: [{
          loader: (env.ENV === 'development') ? 'style-loader' : MiniCssExtractPlugin.loader
        }, {
          loader: 'css-loader'
        }]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './views/index.html'

    })
  ]
});
