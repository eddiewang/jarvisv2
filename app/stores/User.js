import graphql from 'mobx-apollo'
import { extendObservable, toJS } from 'mobx'
import { meQuery, loginMutation } from 'controllers/User'
import client from '../apollo'
import { fromPromise } from 'mobx-utils'

class User {
  contructor () {
    extendObservable(this, {
      get me () {
        return graphql({ client, query: meQuery })
      }
    })
  }

  login = ({ email, password }) =>
    client
      .mutate({
        mutation: loginMutation,
        variables: { email, password }
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
}

export default new User()
