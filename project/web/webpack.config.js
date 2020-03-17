'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlPlugin = require('webpack-html-plugin');
var HasteResolverPlugin = require('haste-resolver-webpack-plugin');

var IP = '0.0.0.0';
var PORT = 3003;
var NODE_ENV = process.env.NODE_ENV;
var ROOT_PATH = path.resolve(__dirname, '..');
var PROD = 'production';
var DEV = 'production';
// var DEV = 'development';
let isProd = NODE_ENV === 'production';

var config = {
    paths: {
        src: path.join(ROOT_PATH, '.'),
        index: path.join(ROOT_PATH, 'index.web'),
    },
};

var webpackConfig = {
    ip: IP,
    port: PORT,
    devtool: isProd ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',
    proxy: { '/ss/api': 'http://localhost:3030' },
    resolve: {
        alias: {
            'react-native': 'ReactWeb',
            'ReactART': 'react-art',
            'react/lib/ReactMount': 'react-dom/lib/ReactMount',
        },
        extensions: ['', '.js', '.web.js', '.ios.js', '.android.js', '.native.js', '.jsx'],
    },
    entry: isProd ? [
        'whatwg-fetch',
        'babel-polyfill',
        config.paths.index,
    ] : [
        'babel-polyfill',
        'webpack-dev-server/client?http://' + IP + ':' + PORT,
        'webpack/hot/only-dev-server',
        config.paths.index,
    ],
    output: {
        path: path.join(__dirname, '../build'),
        filename: 'bundle.js',
        chunkFilename: "[name].chunk.js",
        publicPath:'',
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
        }),
        new HasteResolverPlugin({
            platform: 'web',
            nodeModules: ['react-web'],
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(isProd ? PROD : DEV),
            },
            __DEV__: !isProd,
        }),
        isProd ? new webpack.ProvidePlugin({
            React: 'react',
        }) : new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlPlugin({
            template: "web/index.html",
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url',
                query: {
                    limit: 512,
                    name: 'assets/images/[name].[hash:7].[ext]',
                },
            }, {
                test: /\.html$/,
                loader: 'url',
                query: {
                    limit: 10,
                    name: 'assets/htmls/[name].[hash:7].[ext]',
                },
            }, {
                test: /\.json$/,
                loader: 'json',
            }, {
                test: /\.jsx?$/,
                loader: 'react-hot',
                include: [config.paths.src],
                exclude: [/node_modules/],
            }, {
                test: /\.jsx?$/,
                loader: 'babel',
                query: {
                    presets: ['react-native', 'stage-1'],
                    plugins: [
                        ["import", { libraryName: "antd-mobile", style: "css" }],
                    ],
                },
                include: [config.paths.src],
                exclude: [path.sep === '/' ? /(node_modules\/(?!react-))/ : /(node_modules\\(?!react-))/],
            },
            {
                test: /\.css$/,
                loader: 'style!css',
            },
        ],
    },
};
webpackConfig.resolve.alias[path.basename(ROOT_PATH, '.')] = path.join(ROOT_PATH, '.');

module.exports = webpackConfig;
