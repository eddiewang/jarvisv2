import { extendObservable, toJS, when } from 'mobx'
// import {
//   loginMutation,
//   registerMutation,
//   allUsersQuery,
//   meQuery
// } from 'controllers/User'
import graphql from 'mobx-apollo'
import client from '../apollo'
import { fromPromise } from 'mobx-utils'

class Question {
  constructor () {
    this.stream = {
      more: true
    }
  }
}

export default Question
