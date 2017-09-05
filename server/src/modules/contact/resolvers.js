
export default pubsub => ({
  Query: {
    fetchContacts(_, { active }, ctx) {
      return ctx.Contact.fetchByActive(true)
    },
  },
  Mutation: {
    async createContact(_, { input }, ctx) {
      return await ctx.Contact.create({contact: input})
    },
  },

})