import hapi from 'hapi'
import { graphiqlHapi, graphqlHapi } from 'apollo-server-hapi'
import { makeExecutableSchema } from 'graphql-tools'
import Mongoose from 'mongoose'

import connectors from './connectors'
// import constants from './config/constants'
import resolvers from './resolvers'
import { typeDefs } from './schema'

import { invert } from 'lodash'
import queryMap from './extracted_queries.json'

import settings from './config/settings'
import log from './log'

import executableSchema from './api/schema'

// Initiate Mongoose
Mongoose.Promise = global.Promise
Mongoose.connect(settings.DBURI, settings.DBOptions)
  .then()
  .catch(err => {
    //note: this is likely redundant, need to test which is better
    console.error('err:', err) // eslint-disable-line
    log.error(err)
  }
)

const db = Mongoose.connection
db.on('error', console.error.bind(console, 'Connection error:')) // eslint-disable-line no-console
db.once('open', () => console.log('mongodb is connected')) // eslint-disable-line no-console

const server = new hapi.Server()
server.connection({
  host: settings.appHost,
  port: settings.appPort,
  routes: {cors: true},
})

/*const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    // requireResolversForAllFields: false,
    // requireResolversForArgs: false,
    requireResolversForNonScalar: false,
  },
  // allowUndefinedInResolve: true,
  printErrors: true,
})*/

server.ext('onPreHandler', (req, reply) => {
  if (req.url.path.indexOf('/graphql') >= 0 && req.payload.id) {
    const invertedMap = invert(queryMap)
    req.payload.query = invertedMap[req.payload.id]
    log.info({query: req.payload.query})
  }
  return reply.continue()
})

server.register({
  register: graphqlHapi,
  options: {
    path: '/graphql',
    graphqlOptions: () => {
      return {
        schema: executableSchema,
        context: { constructor: connectors },
        formatError(error) {
          // console.error('error stack:', error.stack) // eslint-disable-line no-console
          log.error(error.stack)
          return error
        },
      }
    },
  },
})

server.register({
  register: graphiqlHapi,
  options: {
    path: '/graphiql',
    graphiqlOptions: {
      endpointURL: '/graphql',
    },
  },
}, function (err) {
  if (err) { throw err }

  server.start(function () {
    server.log('info', `Server running at ${server.info.uri}`)
    log.info(`Server running at ${server.info.uri}`)
  })
})
