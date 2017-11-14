import gql from 'graphql-tag'

export const meQuery = gql`
  query {
    me {
      id
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
