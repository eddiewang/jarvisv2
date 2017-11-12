export default `

  type Community {
    id: Int!
    name: String!
    users: [User!]!
  }

  type CreateCommunityResponse {
    ok: Boolean!
    community: Community
    errors: [Error!]
  }

  type Query {
    allCommunities: [Community!]!
  }

  type VoidResponse {
    ok: Boolean!
    errors: [Error!]
  }

  type Mutation {
    createCommunity(name: String!): CreateCommunityResponse!
    addCommunityMember(email: String!, communityId: Int!): VoidResponse!
  }
`
