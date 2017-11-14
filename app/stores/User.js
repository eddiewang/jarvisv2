import graphql from 'mobx-apollo'
import { extendObservable, toJS, when } from 'mobx'
import { loginMutation } from 'controllers/User'
import client from '../apollo'
import { fromPromise } from 'mobx-utils'

const { localStorage } = window
class User {
  contructor () {
    // this.me = graphql({ client, query: meQuery })
  }

  login = ({ email, password }) =>
    client.mutate({
      mutation: loginMutation,
      variables: { email, password }
    })

  saveTokens = async (token, refreshToken) => {
    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken)
  }
}

export default new User()
