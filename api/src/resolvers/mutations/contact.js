
export const createContact = async (_, { input }, ctx) => {
  const contact = new ctx.constructor.Contact()
  return await contact.create({contact: input})
}

export const updateContact = async (_, { input }, ctx) => {
  const contact = new ctx.constructor.Contact()
  return await contact.update({contact: input})
}

export const removeContact = async (_, { _id }, ctx) => {
  const contact = new ctx.constructor.Contact()
  return await contact.remove({_id})
}