const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  stats: {
    children: true 
  },
  entry: './src/index.js', 
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      { test: /\.m?js$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpg|jpeg|gif|svg)$/i, type: 'asset/resource' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
  devServer: {
    static: './dist', 
    open: true,
    hot: true,
    port: 8080,
  },
};