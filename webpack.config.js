global._babelPolyfill = false;

const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");
const baseManifest = require("./manifest.json");

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'app');
const dirBac = path.join(__dirname, 'background');
const dirCon = path.join(__dirname, 'content');

module.exports = {
  entry: {
    index: ['@babel/polyfill', path.resolve(__dirname, 'app', 'index.js')],
    background: [
      '@babel/polyfill',
      path.resolve(__dirname, 'background', 'index.js')
    ],
    content: ['@babel/polyfill', path.resolve(__dirname, 'content', 'index.js')]
  },

  // resolve: {
  //   extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  //   modules: [dirNode, dirApp, dirBac, dirCon],
  // },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },

  module: {
    rules: [
      // Program Files
      {
        test: /\.(js|jsx|tsx|json|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // For HTMl
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      //For Styles
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      //For Fonts
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      //For Images
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader?name=/images/[name].[ext]",

      },
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),

    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      title: "boilerplate", // change this to your app title
      meta: {
        charset: "utf-8",
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        "theme-color": "#000000"
      },
      manifest: "manifest.json",
      filename: "index.html",
      template: "./app/index.html",
      hash: true,
      chunks: ['index'],
      cache: false,
    }),
    new WebpackExtensionManifestPlugin({
      config: {
        base: baseManifest
      }
    }),
    new CopyPlugin({
      patterns: [
        { from: './app/images/logo192.png', to: 'logo192.png' },
      ]
    })
  ]
};
