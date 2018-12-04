const path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: './public',
    port: 3001,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      options: {
        presets: ['stage-2']
      }
    }]
  }
};