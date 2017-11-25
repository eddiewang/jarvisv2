export default `
  type Answer {
    id: Int!
    title: String!
    content: String!
    memberId: Int!
    user: User!
    upvotes: Int!
    downvotes: Int!
    vote: String
    questionId: Int!
  }

  type AnswerVoteResponse {
    ok: Boolean!,
    vote: Vote,
    answer: Answer,
    error: [Error!]
  }

  type AnswerCreationResponse {
    ok: Boolean!
    answer: Answer
    error: [Error!]
  }

  type Query {
    allAnswers(id: Int): [Answer!]
  }

  type Mutation {
    createAnswer(title: String!, content: String!, communityId: Int!, questionId: Int!): AnswerCreationResponse!
    upvoteAnswer(id: Int!): AnswerVoteResponse!
    downvoteAnswer(id: Int!): AnswerVoteResponse!
  }
`
