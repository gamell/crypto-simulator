const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

let filename = 'js/main';
let outputFilename = filename;
let devtool = false;
const outputPath = path.resolve(__dirname, 'build');

const env = process.env.WEBPACK_ENV;
const plugins = [
  new CleanWebpackPlugin(['build']),
  new HtmlWebpackPlugin({
    template: 'src/index.ejs'
  })
];

// Different settings based on production flag
if (env === 'production') {
  var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  plugins.push(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }
  ));

  outputFilename += '.min.js';
} else {
  devtool = 'inline-cheap-module-source-map';
  outputFilename += '.js';
  plugins.push(new OpenBrowserPlugin({
    url: `file://${outputPath}/index.html`
  }));
}

module.exports = {
   entry: `./src/${filename}.js`,
   output: {
       path: outputPath,
       filename: outputFilename
   },
   module: {
    loaders: [
      {
       test: /\.js$/,
       loader: 'babel-loader',
       exclude: '/node_modules',
       query: {
         presets: ['es2015']
       },
      },
      {
       test: /\.vue$/,
       loader: 'vue-loader'
      }
    ]
   },
   plugins,
   stats: {
       colors: true
   },
   devtool
};
