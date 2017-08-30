
export default pubsub => ({
  Query: {
    fetchByActive(_, { active }, ctx) {
      return ctx.Contact.fetchByActive(true)
    },
  },
  Mutation: {
    async createContact(_, { input }, ctx) {
      return await ctx.Contact.create({contact: input})
    },
  },

})