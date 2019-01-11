var path = require('path');
var FontMinByFont = require('../.');

var webpackMajorVersion = require('webpack/package.json').version.split('.')[0];

module.exports = {
  context: __dirname,
  entry: './example.js',
  output: {
    path: path.join(__dirname, 'dist/webpack-' + webpackMajorVersion),
    publicPath: '',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.png$/, loader: 'file-loader' }
    ]
  },
  plugins: [
    new FontMinByFont({
      fontpath: path.resolve(__dirname, '../src/assets/font/xx.ttf'), // font source file
      filepath: path.resolve(__dirname, '../src/pages'), // get file font
      targetpath: path.resolve(__dirname, '../src/assets/font'), // split target file to where
      exclude: [path.resolve(__dirname, '../src/pages/xx.js')], // extra file , in [filepath]
      include: [ // other file ,not in [filepath]
        path.resolve(__dirname, '../src/mixin/scan.js'),
        path.resolve(__dirname, '../src/pages/haiZhuan/Center.vue')
      ]
    })
  ]
};
