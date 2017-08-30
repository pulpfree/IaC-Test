import { makeExecutableSchema, addErrorLoggingToSchema } from 'graphql-tools'
// import { addApolloLogging } from 'apollo-logger'

// import rootSchemaDef from './root-schema'
import { typeDefs } from './schema'
import modules from '../modules'
import log from '../../log'
// import settings from '../../config/settings'


const executableSchema = makeExecutableSchema({
  // typeDefs: [rootSchemaDef].concat(modules.schemas),
  typeDefs,
  resolvers: modules.createResolvers(),
})

addErrorLoggingToSchema(executableSchema, { log: (e) => log.error(e) })

export default executableSchema
