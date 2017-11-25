import { gql } from 'react-apollo'
import { AnswerFragment } from 'controllers/Answer'

const QuestionFragment = gql`
 fragment QuestionDefault on Question {
  id
  title
  content
  community {
    id
    name
  }
  user {
    id
    firstName
    lastName
  }
  upvotes
  downvotes
  vote
  answers {
    ...AnswerDefault
  }
 }
 ${AnswerFragment}
`
export const createQuestionMutation = gql`
 mutation ($communityId: Int!, $content: String!, $title: String!) {
  createQuestion(title: $title, content: $content, communityId: $communityId) {
    ok
    question {
      ...QuestionDefault
    }
    error {
      message
    }
  }
 }
 ${QuestionFragment}
`

export const allQuestionsQuery = gql`
  query ($amount: Int, $skip: Int, $communityId: Int) {
    allQuestions(
      amount: $amount,
      skip: $skip,
      communityId: $communityId
    ){
    ok
    hasMore
    questions {
      ...QuestionDefault
    }
    }
  }
  ${QuestionFragment}
`

export const upvoteQuestionMutation = gql`
  mutation ($id: Int!) {
    upvoteQuestion(id: $id) {
      question {
        ...QuestionDefault
      }
      ok
    }
  }
  ${QuestionFragment}
`

export const downvoteQuestionMutation = gql`
  mutation ($id: Int!) {
    downvoteQuestion(id: $id) {
      question {
        ...QuestionDefault
      }
      ok
    }
  }
  ${QuestionFragment}
`

export const singleQuestionQuery = gql`
  query ($id: Int!) {
    singleQuestion(id: $id) {
      ...QuestionDefault
    }
  }
  ${QuestionFragment}
`
