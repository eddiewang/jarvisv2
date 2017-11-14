import { gql } from 'react-apollo'

export const meQuery = gql`
  query {
    allUsers {
      id
    }
  }
`

export const loginMutation = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`
