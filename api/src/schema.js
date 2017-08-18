export const typeDefs = `

# Contact ===============================

type Contact {
  _id: ID
  active: Boolean
  email: String
  name: ContactName
  phones: [ContactPhone]
  updatedAt: String
  createdAt: String
}

type ContactName {
  first: String
  last: String
  prefix: String
}

type ContactPhone {
  id: String
  countryCode: String
  extension: Int
  number: String
}

input ContactInput {
  _id: ID
  active: Boolean
  email: String
  name: ContactNameInput
  phones: [ContactPhoneInput]
}

input ContactNameInput {
  first: String
  last: String
  prefix: String
}

input ContactPhoneInput {
  id: String!
  countryCode: String
  extension: Int
  number: String!
}

input ContactSearchInput {
  active: Boolean
  email: String!
}

# Generic types =========================

type RemoveResult {
  ok: Int
  n: Int
}

type UpdateResult {
  _id: ID
  ok: Int
  n: Int
  nModified: Int
}


# Queries ===============================

type Query {

  fetchContacts: [Contact]
  fetchById(_id:ID!): Contact
  fetchByEmail(email:String!): Contact
  searchByEmail(active:Boolean, email:String!): [Contact]
}

# Mutations =============================

type Mutation {

  createContact(input:ContactInput): Contact
  updateContact(input:ContactInput): Contact
  removeContact(_id:ID!): RemoveResult
}
`