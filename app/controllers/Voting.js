import { gql } from 'react-apollo'

const VoteFragment = {
  answer: gql`
    fragment AnswerVotes on Answer {
      id
      upvotes {
        id
      }
      downvotes {
        id
      }
      _downvotesMeta {
        count
      }
      _upvotesMeta {
        count
      }
    }
  `,
  question: gql`
    fragment QuestionVotes on Question {
      id
      upvotes {
        id
      }
      downvotes {
        id
      }
      _downvotesMeta {
        count
      }
      _upvotesMeta {
        count
      }
    }
  `
}
/*
  Upvote mechanism
  - remove downvote on question
  - add upvote on question
*/

/*
  Downvote mechanism
  - remove upvote on question
  - add downvote on question
*/
export const downvoteAnswer = gql`
  mutation removeAnswerUpvote($userId: ID!, $answerId: ID!){
    removeFromAnswerUpvotes(
      upvotesUserId: $userId,
      answerUpvotesAnswerId: $answerId
    ){
      answerUpvotesAnswer {
        ...AnswerVotes
      }
    }
    addToAnswerDownvotes(
      downvotesUserId: $userId,
      answerDownvotesAnswerId: $answerId
    ){
      answerDownvotesAnswer {
        ...AnswerVotes
      }
    }
  }
  ${VoteFragment.answer}
`

export const downvoteQuestion = gql`
  mutation addQuestionDownvote($userId: ID!, $questionId: ID!){
    removeFromQuestionUpvotes(
      upvotesUserId: $userId,
      questionUpvotesQuestionId: $questionId
    ){
      questionUpvotesQuestion {
        ...QuestionVotes
      }
    }
    addToQuestionDownvotes(
      downvotesUserId: $userId,
      questionDownvotesQuestionId: $questionId
    ){
      questionDownvotesQuestion {
        ...QuestionVotes
      }
    }
  }
  ${VoteFragment.question}
`
export const upvoteQuestion = gql`
  mutation addQuestionUpvote($userId: ID!, $questionId: ID!){
    removeFromQuestionDownvotes(
      downvotesUserId: $userId,
      questionDownvotesQuestionId: $questionId
    ){
      questionDownvotesQuestion {
        ...QuestionVotes
      }
    }
    addToQuestionUpvotes(
      upvotesUserId: $userId,
      questionUpvotesQuestionId: $questionId
    ){
      questionUpvotesQuestion {
        ...QuestionVotes
      }
    }
  }
  ${VoteFragment.question}
`

export const upvoteAnswer = gql`
  mutation addAnswerUpvote($userId: ID!, $answerId: ID!){
    removeFromAnswerDownvotes(
      downvotesUserId: $userId,
      answerDownvotesAnswerId: $answerId
    ){
      answerDownvotesAnswer {
        ...AnswerVotes
      }
    }
    addToAnswerUpvotes(
      upvotesUserId: $userId,
      answerUpvotesAnswerId: $answerId
    ){
      answerUpvotesAnswer {
        ...AnswerVotes
      }
    }
  }
  ${VoteFragment.answer}
`

/*
  Neutralize mechanism
  - remove upvote on question
  - remove downvote on question
*/

export const neutralizeQuestion = gql`
  mutation neutralizeQuestion($userId: ID!, $questionId: ID!) {
    removeFromQuestionDownvotes(
      downvotesUserId: $userId,
      questionDownvotesQuestionId: $questionId
    ){
      questionDownvotesQuestion {
        ...QuestionVotes
      }
    }
    removeFromQuestionUpvotes(
      upvotesUserId: $userId,
      questionUpvotesQuestionId: $questionId
    ){
      questionUpvotesQuestion {
        ...QuestionVotes
      }
    }
  }
  ${VoteFragment.question}
`

export const neutralizeAnswer = gql`
  mutation neutralizeAnswer($userId: ID!, $answerId: ID!){
    removeFromAnswerDownvotes(
      downvotesUserId: $userId,
      answerDownvotesAnswerId: $answerId
    ){
      answerDownvotesAnswer {
        ...AnswerVotes
      }
    }
    removeFromAnswerUpvotes(
      upvotesUserId: $userId,
      answerUpvotesAnswerId: $answerId
    ){
      answerUpvotesAnswer {
        ...AnswerVotes
      }
    }
  }
  ${VoteFragment.answer}
`

// View Count
export const increaseViewCount = gql`
  mutation updateView($questionId: ID!, $views: Int!) {
    updateQuestion(
      id: $questionId
      views: $views
    ){
      views
    }
  }
`
