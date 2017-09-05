import React from 'react'
// import { createBatchingNetworkInterface } from 'apollo-client'
import { PersistedQueryNetworkInterface } from 'persistgraphql'
import { addApolloLogging } from 'apollo-logger'
import { ApolloProvider } from 'react-apollo'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

import createApolloClient from './apollo-client'
import createReduxStore from './redux-store'
// import log from './log'
import queryMap from '../extracted_queries.json'
import Routes from './routes'
import settings from '../config/settings'

import 'typeface-roboto'
import '../styles/index.css'

// NOTE: batching doesn't work with the current setup of persistgraphql.
//  Likely need to install the webpack plugin first: https://github.com/sysgears/persistgraphql-webpack-plugin
/*let networkInterface = createBatchingNetworkInterface({
  opts: {
    credentials: 'same-origin',
  },
  batchInterval: 20,
  uri: settings.backendUrl,
})

if (settings.persistGraphQL) {
  networkInterface = addPersistedQueries(networkInterface, queryMap)
}*/

let networkInterface = new PersistedQueryNetworkInterface({
  queryMap,
  uri: settings.backendUrl,
  opts: {
    credentials: 'same-origin',
  },
})

if (settings.apolloLogging) {
  networkInterface = addApolloLogging(networkInterface)
}

const client = createApolloClient(networkInterface)

let initialState = {}
if (window.__APOLLO_STATE__) {
  initialState = window.__APOLLO_STATE__
}

const history = createHistory()
const store = createReduxStore(initialState, client, routerMiddleware(history))

const Main = () => (
  <ApolloProvider
      client={client}
      store={store}
  >
    <ConnectedRouter history={history}>
      {Routes}
    </ConnectedRouter>
  </ApolloProvider>
)

export default Main
