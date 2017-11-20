import { gql } from 'react-apollo'

export const allCommunitiesQuery = gql`
  query {
    allCommunities {
      id
      name
      icon
    }
  }
`

export const communityQuery = gql`
  query ($id: Int!) {
    community(id: $id) {
      id
      name
      icon
    }
  }
`
