import hapi from 'hapi'
import { graphiqlHapi, graphqlHapi } from 'apollo-server-hapi'
import Mongoose from 'mongoose'

import { invert } from 'lodash'

import executableSchema from './api/schema'
import log from './log'
import modules from './modules'
import queryMap from './extracted_queries.json'
import settings from './config/settings'


/*class Foo {
  constructor() { this.bar() }
  bar() { throw new Error('this is a demo') }
}
// new Foo()*/

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
db.once('open', () => console.log('mongodb is connected...')) // eslint-disable-line no-console

const server = new hapi.Server()
server.connection({
  host: settings.appHost,
  port: settings.appPort,
  routes: {'cors': true},
})

server.ext('onPreHandler', (req, reply) => {
  if (req.url.path.indexOf('/graphql') >= 0 && req.payload.id) {
    const invertedMap = invert(queryMap)
    req.payload.query = invertedMap[req.payload.id]
    log.info({query: req.payload.query})
  }
  return reply.continue()
})

server.ext('onPreResponse', function(req, reply) {
  req.response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  return reply.continue()
})

server.register({
  register: graphqlHapi,
  options: {
    path: '/graphql',
    graphqlOptions: () => {
      return {
        schema: executableSchema,
        context: modules.createContext(),
        formatError(error) {
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

process.on('uncaughtException', (ex) => {
  log.error(ex)
  process.exit(1)
})

process.on('unhandledRejection', reason => {
  log.error(reason)
})
