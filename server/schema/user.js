export default `
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    jobRole: String!
    email: String!
  }

  type Query {
    me: User!
    allUsers: [User!]!
  }

  type RegisterResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }

  type LoginResponse {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
  }

  type Mutation {
    register(firstName: String!, lastName: String!, jobRole: String!, email: String!, password: String!): RegisterResponse!
    login(email: String!, password: String!): LoginResponse!
  }
`
