import { extendObservable, toJS, when, observable } from 'mobx'
import {
  loginMutation,
  registerMutation,
  allUsersQuery,
  meQuery
} from 'controllers/User'
import graphql from 'mobx-apollo'
import client from '../apollo'
import { fromPromise } from 'mobx-utils'

const { localStorage } = window
class User {
  constructor () {
    this.me = graphql({ client, query: meQuery, fetchPolicy: 'network-only' })
    this.allUsers = graphql({ client, query: allUsersQuery })
  }
  register = ({ firstName, lastName, email, jobRole, password }) =>
    client.mutate({
      mutation: registerMutation,
      variables: {
        email,
        password,
        jobRole,
        firstName,
        lastName
      }
    })

  login = ({ email, password }) =>
    client.mutate({
      mutation: loginMutation,
      variables: { email, password }
    })

  @observable logout = true

  saveTokens = async (token, refreshToken) => {
    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken)
  }
}

export default new User()
