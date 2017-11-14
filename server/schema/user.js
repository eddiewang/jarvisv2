export default `
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
  }

  type MeResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }

  type Query {
    me: MeResponse!
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
    register(firstName: String!, lastName: String!, email: String!, password: String!): RegisterResponse!
    login(email: String!, password: String!): LoginResponse!
  }
`
