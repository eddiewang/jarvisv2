import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
// Components
import QuestionCard from 'components/QuestionCard'
import LoadingSpinner from 'components/LoadingSpinner'
import InfiniteScroll from 'react-infinite-scroller'
// Graphql
import { graphql, compose } from 'react-apollo'
import { categoryQuestions, allQuestions } from 'controllers/Post'

@inject('QuestionStore')
@observer
class MapQuestionsContainer extends Component {
  componentDidUpdate () {
    const { category } = this.props
    const { stream } = this.props.QuestionStore
    if (category !== this.props.ui.stream.prevCategory) {
      stream.prevCategory = category
      stream.more = true
    } else {
      stream.prevCategory = category
    }
  }
  render () {
    const allQuestionsBool =
      this.props.allQuestions && !this.props.allQuestions.loading
    const categoryQuestionsBool =
      this.props.categoryQuestions && !this.props.categoryQuestions.loading
    const { more } = this.props.ui.stream
    if (allQuestionsBool || categoryQuestionsBool) {
      return (
        <div>
          <InfiniteScroll
            pageStart={0}
            loadMore={
              allQuestionsBool
                ? this.props.allQuestions.loadMore
                : this.props.categoryQuestions.loadMore
            }
            hasMore={more}
            loader={
              <div className='col-md-12'>
                <LoadingSpinner />
              </div>
            }
          >
            {this._mapCards(
              this.props.categoryQuestions
                ? this.props.categoryQuestions.allQuestions
                : this.props.allQuestions.allQuestions
            )}
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
  _resetMore = () => {
    this.props.ui.stream.more = true
  }
  _mapCards = questions => {
    return questions.map(q => <QuestionCard key={q.id} details={q} />)
  }
}

const appWithApollo = compose(
  graphql(categoryQuestions, {
    name: 'categoryQuestions',
    skip: props => props.category === 'all',
    props ({
      categoryQuestions: { loading, allQuestions, fetchMore },
      ownProps
    }) {
      return {
        categoryQuestions: {
          loading,
          allQuestions,
          loadMore () {
            return fetchMore({
              variables: {
                skip: allQuestions.length
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (fetchMoreResult.allQuestions.length === 0) {
                  ownProps.ui.stream.more = false
                  return previousResult
                }
                return Object.assign({}, previousResult, {
                  allQuestions: [
                    ...previousResult.allQuestions,
                    ...fetchMoreResult.allQuestions
                  ]
                })
              }
            })
          }
        }
      }
    }
  }),
  graphql(allQuestions, {
    name: 'allQuestions',
    skip: props => props.category !== 'all',
    props ({ allQuestions: { loading, allQuestions, fetchMore }, ownProps }) {
      return {
        allQuestions: {
          loading,
          allQuestions,
          loadMore () {
            return fetchMore({
              variables: {
                skip: allQuestions.length
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (fetchMoreResult.allQuestions.length === 0) {
                  ownProps.ui.stream.more = false
                  return previousResult
                }
                return Object.assign({}, previousResult, {
                  allQuestions: [
                    ...previousResult.allQuestions,
                    ...fetchMoreResult.allQuestions
                  ]
                })
              }
            })
          }
        }
      }
    }
  })
)(MapQuestionsContainer)

export default appWithApollo
