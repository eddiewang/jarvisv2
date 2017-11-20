import { gql } from 'react-apollo'

export const allQuestionsQuery = gql`
  query allQuestions($amount: Int!, $skip: Int!, $communityId: Int) {
    allQuestions(
      amount: $amount,
      skip: $skip,
      communityId: $communityId
    ){
    ok
    hasMore
    questions {
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
    }
    }
  }
`
