const path = require('path');

module.exports = {
  mode: 'development',
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