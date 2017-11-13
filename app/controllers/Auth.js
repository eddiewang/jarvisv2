import { gql } from 'react-apollo'

const UserFragment = {
  default: gql`
    fragment UserDefault on User {
        firstname
        lastname
        jobRole
        verified
        email
        id
        avatar {
          url
        }
    }
  `
}

export const signup = gql`
  mutation createUser(
    $email: String!, 
    $password: String!,
    $firstname: String!,
    $lastname: String!,
    $jobRole: String!
  ){
    createUser(authProvider: {
      email: {
        email: $email,
        password: $password
      }
    },
    firstname: $firstname,
    lastname: $lastname,
    jobRole: $jobRole
    ) {
      id
    }
  }
`

export const setAvatar = gql`
  mutation setAvatar($userId: ID!, $fileId: ID!) {
    setAvatarImage(
      profilePictureUserId: $userId,
      avatarFileId: $fileId
    ){
      avatarFile {
        id
      }
    }
  }
`

export const signin = gql`
  mutation loginUser(
    $email: String!,
    $password: String!
  ){
    signinUser(email: {
      email: $email,
      password: $password
    }){
      user {
        ...UserDefault
      }
      token
    }
  }
  ${UserFragment.default}
`
