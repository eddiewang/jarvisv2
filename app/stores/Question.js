import { extendObservable, toJS, when } from 'mobx'
// import {
//   loginMutation,
//   registerMutation,
//   allUsersQuery,
//   meQuery
// } from 'controllers/User'
import {
  upvoteQuestionMutation,
  downvoteQuestionMutation,
  createQuestionMutation
} from 'controllers/Question'
import graphql from 'mobx-apollo'
import client from '../apollo'
import { fromPromise } from 'mobx-utils'

class Question {
  upvoteQuestion = questionId => {
    client.mutate({
      mutation: upvoteQuestionMutation,
      variables: {
        id: questionId
      }
    })
  }
  downvoteQuestion = questionId => {
    client.mutate({
      mutation: downvoteQuestionMutation,
      variables: {
        id: questionId
      }
    })
  }
  createQuestion = ({ content, title, communityId }) => {
    client.mutate({
      mutation: createQuestionMutation,
      variables: {
        content,
        title,
        communityId
      }
    })
  }
}

export default new Question()
