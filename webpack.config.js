const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
   entry: './src/js/main.js',
   output: {
       path: path.resolve(__dirname, 'build'),
       filename: 'js/main.bundle.js'
   },
   module: {
       loaders: [
           {
               test: /\.js$/,
               loader: 'babel-loader',
               exclude: '/node_modules'
           },
           {
              test: /\.html$/,
              loader: 'html-loader',
              template: 'index.ejs'
           }
       ]
   },
   plugins: [
     new CleanWebpackPlugin(['build']),
     new HtmlWebpackPlugin()
   ],
   stats: {
       colors: true
   },
   devtool: 'source-map'
};
