export default `
  type Question {
    id: Int!
    content: String!
    title: String!
    memberId: Int!
    user: User!
    community: Community!
    answers: [Answer!]
  }

  type AllQuestionsResponse {
    ok: Boolean!
    hasMore: Boolean!
    questions: [Question!]
  }

  type Query {
    allQuestions(amount: Int!, skip: Int!, communityId: Int): AllQuestionsResponse!
    singleQuestion(id: Int!): Question
    categoryQuestions(category: Int!, amount: Int!, skip: Int!): [Question!]
  }

  type QuestionCreationResponse {
    ok: Boolean!
    question: Question
    error: [Error!]
  }

  type Mutation {
    createQuestion(title: String!, content: String!, memberId: Int!): QuestionCreationResponse!
  }
`
