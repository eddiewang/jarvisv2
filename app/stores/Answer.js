import { extendObservable, toJS, when } from 'mobx'
// import {
//   upvoteQuestionMutation,
//   downvoteQuestionMutation,
//   createQuestionMutation
// } from 'controllers/Question'
import {
  downvoteAnswerMutation,
  upvoteAnswerMutation,
  createAnswerMutation
} from 'controllers/Answer'

import graphql from 'mobx-apollo'
import client from '../apollo'
import { fromPromise } from 'mobx-utils'

class Answer {
  upvoteAnswer = answerId => {
    client.mutate({
      mutation: upvoteAnswerMutation,
      variables: {
        id: answerId
      }
    })
  }
  downvoteAnswer = answerId => {
    client.mutate({
      mutation: downvoteAnswerMutation,
      variables: {
        id: answerId
      }
    })
  }
  createAnswer = ({ content, title, communityId, questionId }) => {
    client.mutate({
      mutation: createAnswerMutation,
      variables: {
        content,
        title,
        communityId,
        questionId
      }
    })
  }
}

export default new Answer()
