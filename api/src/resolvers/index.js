import queries from './queries'
import mutations from './mutations'

const resolveFunctions = {
  Query: {
    ...queries,
  },
  Mutation: {
    ...mutations,
  },
}

module.exports = resolveFunctions