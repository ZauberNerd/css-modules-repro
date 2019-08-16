const path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: require.resolve('css-loader'),
        options: {
          modules: true
        }
      }
    ]
  }
};