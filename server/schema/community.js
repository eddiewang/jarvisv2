export default `

  type Community {
    id: Int!
    name: String!
    icon: String!
  }

  type CreateCommunityResponse {
    ok: Boolean!
    community: Community
    errors: [Error!]
  }

  type Query {
    community(id: Int!): Community!,
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
