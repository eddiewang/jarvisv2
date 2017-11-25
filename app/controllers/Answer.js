import { gql } from 'react-apollo'

export const AnswerFragment = gql`
  fragment AnswerDefault on Answer {
    id
    title
    content
    user {
      id
      firstName
      lastName
    }
    upvotes
    downvotes
    vote
    questionId
  }
`

export const createAnswerMutation = gql`
  mutation ($communityId: Int!, $questionId: Int!, $title: String!, $content: String!) {
    createAnswer(title: $title, content: $content, communityId: $communityId, questionId: $questionId) {
      ok
      answer {
        ...AnswerDefault
      }
      error {
        message
      }
    }
  }
  ${AnswerFragment}
`

export const allAnswersQuery = gql`
  query ($id: Int!) {
    allAnswers(id: $id) {
      ...AnswerDefault
    }
  }
  ${AnswerFragment}
`

export const upvoteAnswerMutation = gql`
  mutation ($id: Int!) {
    upvoteAnswer(id: $id) {
      answer {
        ...AnswerDefault
      }
      ok
    }
  }
  ${AnswerFragment}
 `

export const downvoteAnswerMutation = gql`
  mutation ($id: Int!) {
    downvoteAnswer(id: $id) {
      answer {
        ...AnswerDefault
      }
      ok
    }
  }
  ${AnswerFragment}
 `
