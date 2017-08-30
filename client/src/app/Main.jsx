import React from 'react'
import { createBatchingNetworkInterface } from 'apollo-client'
// import { addPersistedQueries } from 'persistgraphql'
import { addApolloLogging } from 'apollo-logger'
import { ApolloProvider } from 'react-apollo'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

import createApolloClient from './apollo-client'
import createReduxStore from './redux-store'

import settings from '../config/settings'
import Routes from './routes'
import log from './log'

import 'typeface-roboto'
// import '../styles/index.sass'

// log.debug('Updating front-end debug')
log.info('Updating front-end info')
// log.error('Updating front-end error')
// log.error('Updating front-end error 2')
// log.error('Updating front-end error 3')
// log.warn('Updating front-end warn')
// log.warn('Updating front-end warn 2')
// log.warn('Updating front-end warn 3')
// console.log('window.location:', window.location)

let networkInterface = createBatchingNetworkInterface({
  opts: {
    credentials: 'same-origin',
  },
  batchInterval: 20,
  uri: settings.backendUrl,
})

if (settings.persistGraphQL) {
  // networkInterface = addPersistedQueries(networkInterface, queryMap);
}

if (settings.apolloLogging) {
  networkInterface = addApolloLogging(networkInterface)
}

const client = createApolloClient(networkInterface)

let initialState = {}

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
