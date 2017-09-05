// const PersistGraphQLPlugin = require('persistgraphql-webpack-plugin')

module.exports = function override(config, env) {
  const path = require('path')

  // workaround for https://github.com/apollographql/apollo-client/issues/1237
  config.resolve.modules.push(path.resolve(__dirname, 'node_modules', 'apollo-client'))

  // add graphql loader
  config.module.rules[1].oneOf.unshift({
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    // loader: 'graphql-tag/loader'
    use: [
      'graphql-tag/loader',
      // 'persistgraphql-webpack-plugin/graphql-loader'
    ],
  })

  /*plugins: [
    new PersistGraphQLPlugin({filename: 'persisted_queries.json',
        moduleName: path.resolve('node_modules/persisted_queries.json')})
  ]*/
  /*config = new PersistGraphQLPlugin({filename: 'persisted_queries.json',
        moduleName: path.resolve('node_modules/persisted_queries.json')})*/

  return config
}