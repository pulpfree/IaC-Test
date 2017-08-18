
export const fetchById =  async (_, { _id }, ctx) => {
  const contact = new ctx.constructor.Contact()
  return await contact.fetchById({_id})
}

export const fetchByEmail =  async (_, { email }, ctx) => {
  const contact = new ctx.constructor.Contact()
  return await contact.fetchByEmail({email})
}

export const searchByEmail =  async (_, { active = true, email }, ctx) => {
  const contact = new ctx.constructor.Contact()
  return await contact.searchByEmail({active, email})
}