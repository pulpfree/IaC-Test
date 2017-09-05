const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const debug = process.env.NODE_ENV !== 'production'


module.exports = {
  // entry: ['babel-polyfill', './src/app.js'],
  entry: ['./src/app.js'],
  target: 'node',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'server.js',
  },
  devtool: debug ? 'inline-source-map' : 'sourcemap',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015',
            'stage-0',
          ],
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
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: [
          'json-loader',
        ],
      },
    ],
  },

  externals: [nodeExternals()],
  plugins: debug ? [] : [
    new UglifyJSPlugin({ sourcemap: false }),
  ],
}
