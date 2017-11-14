import gql from 'graphql-tag'

export const meQuery = gql`
  {
    me {
      firstName
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
