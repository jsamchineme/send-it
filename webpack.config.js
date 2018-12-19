const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const webpack= require('webpack');

dotenv.config();

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      filename: path.resolve(__dirname, 'dist/index.html'),
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        DEV_API_URL: JSON.stringify(process.env.DEV_API_URL),
        API_URL: JSON.stringify(process.env.API_URL),
        MAP_API_KEY: JSON.stringify(process.env.MAP_API_KEY),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
  devServer: {
    contentBase: './dist',
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