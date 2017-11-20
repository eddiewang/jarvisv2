import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
// Components
import QuestionCard from 'components/QuestionCard'
import LoadingSpinner from 'components/LoadingSpinner'
import InfiniteScroll from 'react-infinite-scroller'
// Graphql
import { graphql, compose } from 'react-apollo'
import { categoryQuestions, allQuestions } from 'controllers/Post'
import { allQuestionsQuery } from 'controllers/Question'

@inject('QuestionStore')
@observer
class MapQuestionsContainer extends Component {
  render () {
    const allQuestionsBool =
      this.props.allQuestions && !this.props.allQuestions.loading
    if (allQuestionsBool) {
      const { hasMore, questions } = this.props.allQuestions.allQuestions
      return (
        <div>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.props.allQuestions.loadMore}
            hasMore={hasMore}
            loader={
              <div className='col-md-12'>
                <LoadingSpinner />
              </div>
            }
          >
            {this._mapCards(questions)}
          </InfiniteScroll>

        </div>
      )
    } else {
      return (
        <div className='col-md-12'>
          <LoadingSpinner />
        </div>
      )
    }
  }
  _resetMore = () => {}
  _mapCards = questions => {
    return questions.map(q => <QuestionCard key={q.id} details={q} />)
  }
}

const appWithApollo = graphql(allQuestionsQuery, {
  name: 'allQuestions',
  options: ({ communityId, amount, skip }) => ({
    variables: {
      amount,
      skip,
      communityId: communityId === 'all' ? undefined : communityId
    }
  }),
  props ({ allQuestions: { loading, allQuestions, fetchMore }, ownProps }) {
    return {
      allQuestions: {
        loading,
        allQuestions,
        loadMore: () => {
          return fetchMore({
            variables: {
              skip: allQuestions.questions.length
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              console.log(fetchMoreResult)
              if (fetchMoreResult.allQuestions.questions.length === 0) {
                const previousQuestions = Object.assign(
                  {},
                  previousResult.allQuestions,
                  {
                    ok: true,
                    hasMore: false
                  }
                )
                return Object.assign({}, previousResult, {
                  allQuestions: previousQuestions
                })
              }
              const newQuestions = Object.assign(
                {},
                previousResult.allQuestions,
                {
                  questions: [
                    ...previousResult.allQuestions.questions,
                    ...fetchMoreResult.allQuestions.questions
                  ]
                }
              )
              return Object.assign({}, previousResult, {
                allQuestions: newQuestions
              })
            }
          })
        }
      }
    }
  }
})(MapQuestionsContainer)

export default appWithApollo
