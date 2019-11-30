/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 18:00:31
 * @LastEditTime: 2019-08-23 08:47:21
 * @LastEditors: Please set LastEditors
 */
/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-08-19 15:32:20
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-29 10:30:28
 */
'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const title = defaultSettings.title || '信息资源管理平台' // page title

module.exports = {
    publicPath: process.env.VUE_APP_BASE, // 根路径
    outputDir: 'dist', //构建输出目录
    assetsDir: 'assets', //静态资源目录
    lintOnSave: false, // 是否开启eslint保存检测，有效值true/false/error
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8090,
        https: false,
        hotOnly: false,
        proxy: { //配置跨域
            '/api': {
                target: process.env.VUE_APP_SERVER_API,
                ws: true, // 是否启用websockets
                changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: title,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    }
}