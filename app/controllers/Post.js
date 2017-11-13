import { gql } from 'react-apollo'

export const createQuestion = gql`
  mutation createQuestion(
    $title: String!,
    $content: String!,
    $userId: ID!,
    $anonymous: Boolean!,
    $category: String!
  ){
    createQuestion(
      title: $title,
      content: $content,
      userId: $userId,
      anonymous: $anonymous,
      category: $category,
      views: 0
    ){
      id
    }
  }
`

const PostFragment = {
  default: gql`
    fragment PostDefault on Question {
      id
      title
      content
      category
      views
      user {
        firstname
        lastname
        jobRole
        id
        avatar {
          url
        }
      }
      upvotes {
        id
      }
      downvotes {
        id
      }
      _upvotesMeta {
        count
      }
      _downvotesMeta {
        count
      }
      _answersMeta {
        count
      }
    }
  `
}

export const AnswerFragment = {
  default: gql`
    fragment AnswerDefault on Answer {
      id
      content
      upvotes {
        id
      }
      downvotes {
        id
      }
      user {
        firstname
        lastname
        jobRole
        id
        avatar {
          url
        }
      }
    }
  `
}

export const allQuestions = gql`
  query allQuestions($amount: Int!, $skip: Int!) {
    allQuestions(
      orderBy:updatedAt_DESC,
      first: $amount,
      skip: $skip
    ){
      ...PostDefault
    }
  }
  ${PostFragment.default}
`

export const categoryQuestions = gql`
  query categoryQuestions(
    $category: String!
    $amount: Int!,
    $skip: Int!
  ){
    allQuestions(
      filter: {
      category_in: [$category]
      },
      orderBy:updatedAt_DESC,
      first: $amount,
      skip: $skip
    ){
      ...PostDefault
    }
  }
  ${PostFragment.default}
`

export const singleQuestion = gql`
  query singleQuestion($id: ID!){
    Question(id: $id){
      ...PostDefault
      answers(orderBy: createdAt_DESC) {
        ...AnswerDefault
      }
    }
  }
  ${PostFragment.default}
  ${AnswerFragment.default}
`

export const createAnswer = gql`
  mutation createAnswer(
    $content: String!,
    $userId: ID!
    $anonymous: Boolean!
    $questionId: ID!
  ){
    createAnswer(
      content: $content,
      userId: $userId,
      questionId: $questionId,
      anonymous: $anonymous
    ){
      ...AnswerDefault
    }
  }
  ${AnswerFragment.default}
`
