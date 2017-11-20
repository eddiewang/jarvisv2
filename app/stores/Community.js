import { toJS } from 'mobx'
import graphql from 'mobx-apollo'
import client from '../apollo'
import { allCommunitiesQuery } from 'controllers/Community'

class Community {
  constructor () {
    this.allCommunities = graphql({ client, query: allCommunitiesQuery })
  }
}

export default new Community()
