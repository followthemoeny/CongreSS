const path = require('path');

const mode = process.env.NODE_ENV;
const webpack = require('webpack');

module.exports = {
  devServer: {
    historyApiFallback: true,
    publicPath: '/build/',
    proxy: {
      '/api': 'http://localhost:3000',
    },
    port: 8080,
    hot: true,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  entry: ['./client/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/build/',
  },
  mode,
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};
