import schema from './schema.graphql'
import createResolvers from './resolvers'

import Contact from './context'
import Feature from '../connector'

export default new Feature({schema, createResolversFunc: createResolvers,
  createContextFunc: () => {

    const contact = new Contact()
    // console.log('contact in createContextFunc:', contact)
    return {
      Contact: contact,
    }
    /*const post = new Post();

    return {
      Post: post,
      loaders: {
        getCommentsForPostIds: new DataLoader(post.getCommentsForPostIds),
      }
    };*/
  },
})