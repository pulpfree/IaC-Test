var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: './src/index.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        // loader: 'graphql-tag/loader'
        use: [
          'graphql-tag/loader',
          // 'persistgraphql-webpack-plugin/graphql-loader'
        ],
      },
    ],
  },
  externals: nodeModules,
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    // new webpack.BannerPlugin({ raw: true, entryOnly: false }),
    new webpack.BannerPlugin('require("source-map-support").install();')
  ],
  devtool: 'sourcemap'
}