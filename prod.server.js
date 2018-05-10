'use strict'
const utils = require('./build/utils')
const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./build/webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const express = require('express')
var axios = require('axios')
const app = express()
var apiRoutes = express.Router()
app.use('/api', apiRoutes)

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.cssSourceMap,
      usePostCSS: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.build.devtool,

  // these devServer options should be customized in /config/index.js
  buildServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [{
        from: /.*/,
        to: path.posix.join(config.build.assetsPublicPath, 'index.html')
      }, ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.build.host,
    port: PORT || config.build.port,
    open: config.build.autoOpenBrowser,
    overlay: config.build.errorOverlay ? {
      warnings: false,
      errors: true
    } : false,
    publicPath: config.build.assetsPublicPath,
    proxy: config.build.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.build.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/build.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: config.build.assetsSubDirectory,
      ignore: ['.*']
    }])
  ]
})


module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.build.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.build.notifyOnErrors ?
          utils.createNotifierCallback() : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})

