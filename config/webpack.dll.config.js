const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var path = require('path');

module.exports = {
    output: {
        path: helpers.root('public'),
        filename: '[name].[chunkhash].js',
        library: '[name]_[chunkhash]',
    },
    entry: {
        /*
          指定需要打包的js模块
          或是css/less/图片/字体文件等资源，但注意要在module参数配置好相应的loader
        */
        dll: [
            'zone.js',
            'rxjs',
            'reflect-metadata',
            'es6-shim',
            'es6-promise',
            "@angular/common",
            "@angular/compiler",
            "@angular/core",
            "@angular/forms",
            "@angular/http",
            "@angular/platform-browser",
            "@angular/platform-browser-dynamic",
            "@angular/router",
            "@angular/upgrade",
            'moment',
            'bootstrap',
            'jquery',
            'angular2-cookie',
            'blueimp-md5',
            'ng2-file-upload',
            'ng2-pagination'
        ],
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "manifest.json"),
            name: '[name]_[chunkhash]',
            context: __dirname,
        }),
    ],
    //module: require('./webpack-config/module.config.js'), // 沿用业务代码的module配置
    //resolve: require('./webpack-config/resolve.config.js'), // 沿用业务代码的resolve配置
};