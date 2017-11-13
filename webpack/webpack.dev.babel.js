const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = require('./webpack.base.babel')({
  entry: [
    // disabled eventsource-polyfill because who the fuck uses IE to dev
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true',
    path.join(process.cwd(), 'app/app.js')
  ],

  output: {
    filename: `[name].js`,
    chunkFilename: '[name].chunk.js'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(process.cwd(), 'public/index.html')
    })
  ],

  devtool: 'cheap-module-eval-source-map'
})
