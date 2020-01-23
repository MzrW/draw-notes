const path = require('path');

module.exports = {
  entry: './src/draw-notes.js',
  target: 'web',
  devtool: 'source-map',
  output: {
    filename: 'draw-notes.js',
    path: path.resolve(__dirname, 'dist'),

    library: 'DrawNotes',
    libraryTarget: 'var',
    umdNamedDefine: true,
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};