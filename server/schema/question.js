export default `
  type Member {
    id: Int!
    admin: Boolean!
  }
  type Question {
    id: Int!
    content: String!
    title: String!
    memberId: Int!
    owner: User!
    answers: [Answer!]
  }

  type Query {
    allQuestions: [Question!]!
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
