const path = require('path');
const mode = process.env.NODE_ENV;
const webpack = require('webpack');
module.exports = {
  devServer: {
    publicPath: '/build/',
    proxy: {
      '/api': 'http://localhost:3000',
    },
    port: 8080,
    hot: true,
  },
<<<<<<< HEAD
=======
  watchOptions: {
    ignored: /node_modules/
  },
>>>>>>> fa83a631f7f5c32aa5d2e7ea9433f2a7d87c6775
  entry: ['./client/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
<<<<<<< HEAD
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
=======
    publicPath: 'http://localhost:8080/build/'
  },
  mode,
  plugins: [ new webpack.HotModuleReplacementPlugin() ],
  module: {
    rules: [
      { 
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
        loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react']
          } 
        }
      },
    ]
  }
};
>>>>>>> fa83a631f7f5c32aa5d2e7ea9433f2a7d87c6775
