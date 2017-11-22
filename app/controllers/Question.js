import { gql } from 'react-apollo'

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
 }
`
export const allQuestionsQuery = gql`
  query allQuestions($amount: Int, $skip: Int, $communityId: Int) {
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
