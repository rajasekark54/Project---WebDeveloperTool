const path = require('path');
const merge = require('webpack-merge');
const webConfig = require('./webpack.config');

module.exports = merge(webConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    // optimization: {
    //     splitChunks: { chunks: "all" },
    //     mergeDuplicateChunks: false
    // },
    // watch: true
})