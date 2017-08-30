import ApolloClient from 'apollo-client'

const createApolloClient = networkInterface => {
  return new ApolloClient({
    networkInterface,
    dataIdFromObject: obj => obj._id,
  })
}

export default createApolloClient