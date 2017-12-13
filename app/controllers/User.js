import { gql } from 'react-apollo'

export const meQuery = gql`
  query {
    me {
      id
      firstName
      lastName
      jobRole
      email
    }
  }
`

export const allUsersQuery = gql`
  query {
    allUsers {
     id
     firstName
     lastName
    }
  }
`

export const registerMutation = gql`
  mutation ($email: String!, $password: String!, $jobRole: String!, $firstName: String!, $lastName: String!) {
    register(email: $email, firstName: $firstName, lastName: $lastName, jobRole: $jobRole, password: $password){
      ok
      user {
        id
        firstName
        lastName
        email
      }
      errors {
        path
        message
      }
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
