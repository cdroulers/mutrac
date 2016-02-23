/// <reference path="typings/node/node.d.ts"/>

var path = require("path");
var webpackShared = require("./webpack.shared");
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackMd5Hash = require("webpack-md5-hash");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var nodeModulesPath = path.join(__dirname, 'node_modules');
var packageJson = require("./package.json");


var config = {
  // entry points - each will produce one bundled js file and one css file if there is any css in dependency tree
  entry: {
    vendors: [
      'react',
      'react-dom'
    ],
    app: [
      path.join(__dirname, 'app', 'index.tsx'),
      path.join(__dirname, 'app', 'main.less')
    ]
  },

  // This is path to loaders
  resolveLoader: {
    root: nodeModulesPath
  },

  resolve: {
    extensions: ['', '.tsx', '.ts', '.js', '.less', '.css'],
    fallback: __dirname,
    modulesDirectories: ["node_modules", "resources"]
  },

  output: {
      path: path.join(__dirname, 'build'),
      filename: '[name]_[chunkhash].js'
  },

  module: {
    preLoaders: [
      { test: /\.ts(x?)$/, loader: "tslint", include: path.resolve(__dirname, "App") },
    ],
    noParse: [],
    loaders: [
      { test: /\.ts(x?)$/, loader: "ts-loader?instance=jsx", include: path.resolve(__dirname, "App") },
      { test: /\.css$/,  loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize"), include: path.resolve(__dirname, "App") },
      { test: /\.less$/, exclude: /\.module\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize!less-loader?compress"), include: path.resolve(__dirname, "App") },
      { test: /\.(jpg|png|woff|eot|ttf|svg|gif)$/, loader: "file-loader?name=[name]_[hash].[ext]", include: path.resolve(__dirname, "App") }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors_[chunkhash].js'),
    new ExtractTextPlugin('[name]_[chunkhash].css', { allChunks: true }),
    new WebpackMd5Hash(),
    new HtmlWebpackPlugin({
      template: "template.html",
      inject: "body",
      version: packageJson.version
    })
  ],

  tslint: {
    // Rules are in tslint.json
    emitErrors: true, // false = WARNING for webpack, true = ERROR for webpack
    formattersDirectory: path.join(nodeModulesPath, 'tslint-loader', 'formatters')
  },
};

if (webpackShared.isProduction) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
     compress: {
        warnings: false
    }
  }));
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {NODE_ENV: '"production"'}
  }));
}

module.exports = config;
