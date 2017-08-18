import hapi from 'hapi'
import { graphiqlHapi, graphqlHapi } from 'apollo-server-hapi'
import { makeExecutableSchema } from 'graphql-tools'
import Mongoose from 'mongoose'

import connectors from './connectors'
import constants from './config/constants'
import resolvers from './resolvers'
import { typeDefs } from './schema'


// Initiate Mongoose
Mongoose.Promise = global.Promise
Mongoose.connect(constants.database['uri'], constants.database['options'])
  .then()
  .catch(err => {
    //note: this is likely redundant, need to test which is better
    console.error('err:', err) // eslint-disable-line
    //todo: log error here
  }
)
const db = Mongoose.connection
db.on('error', console.error.bind(console, 'Connection error:')) // eslint-disable-line no-console
db.once('open', () => console.log('mongodb is connected')) // eslint-disable-line no-console

const server = new hapi.Server()
server.connection({
  host: constants.application['host'],
  port: constants.application['port'],
  routes: {cors: true},
})

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    // requireResolversForAllFields: false,
    // requireResolversForArgs: false,
    requireResolversForNonScalar: false,
  },
  // allowUndefinedInResolve: true,
  printErrors: true,
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

  // if (!module.parent) {
  server.start(function () {
    server.log('info', `Server running at ${server.info.uri}`)
  })
  // }
})