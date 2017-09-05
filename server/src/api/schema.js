import { makeExecutableSchema, addErrorLoggingToSchema } from 'graphql-tools'
// import { addApolloLogging } from 'apollo-logger'

import rootSchemaDef from './root-schema.graphql'
import modules from '../modules'
import log from '../log'
// import settings from '../../config/settings'


const executableSchema = makeExecutableSchema({
  typeDefs: [rootSchemaDef].concat(modules.schemas),
  resolvers: modules.createResolvers(),
})

addErrorLoggingToSchema(executableSchema, { log: (e) => log.error(e) })

export default executableSchema
