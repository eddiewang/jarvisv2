import React, { Component } from 'react'
import { capitalize, checkId } from 'utils/helper'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'
// Components
import Header from 'components/Header'
import Footer from 'components/Footer'
import InlineAvatar from 'components/InlineAvatar'
import LoadingSpinner from 'components/LoadingSpinner'
import VoteButton from 'components/VoteButton'
import ReactQuill from 'react-quill'
import ModalFill from 'components/ModalFill'
import CardStatTag from 'components/CardStatTag'
// Containers
import CreateAnswerPage from 'containers/CreateAnswerPage'
import MapAnswersContainer from 'containers/MapAnswer'
// Graphql
import { graphql, compose, withApollo } from 'react-apollo'
import { singleQuestionQuery } from 'controllers/Question'
// import {
//   upvoteQuestion,
//   downvoteQuestion,
//   neutralizeQuestion,
//   increaseViewCount
// } from './controllers/Voting'
// import { singleQuestion } from './controllers/Post'

@withApollo
@inject('UserStore', 'QuestionStore')
@observer
class SingleQuestionPage extends Component {
  _updateView = () => {
    // const views = this.props.singleQuestion.Question.views + 1
    // this.props.viewInc({
    //   variables: {
    //     questionId: this.props.singleQuestion.Question.id,
    //     views
    //   }
    // })
  }
  upvoteActive = () => {
    // const q = this.props.singleQuestion.Question
    // return checkId(q.upvotes, this.props.user.profile.id).length > 0
  }
  downvoteActive = () => {
    // const q = this.props.singleQuestion.Question
    // return checkId(q.downvotes, this.props.user.profile.id).length > 0
  }
  voteCount = () => {
    // const q = this.props.singleQuestion.Question
    // const id = this.props.user.profile.id
    // return checkId(q.upvotes, id).length - checkId(q.downvotes, id).length
  }
  updateQuery = async answer => {
    // const data = await this.props.client.readQuery({
    //   query: singleQuestion,
    //   variables: {
    //     id: this.props.singleQuestion.Question.id
    //   }
    // })
    // data.Question.answers = [answer, ...data.Question.answers]
    // data.Question._answersMeta.count += 1
    // await this.props.client.writeQuery({
    //   query: singleQuestion,
    //   variables: {
    //     id: this.props.singleQuestion.Question.id
    //   },
    //   data: data
    // })
  }

  render () {
    if (
      !this.props.singleQuestion.loading &&
      this.props.singleQuestion.singleQuestion
    ) {
      this._updateView()
      const s = this.props.singleQuestion.singleQuestion
      const communityName = capitalize(s.community.name)
      const { title, content, upvotes, downvotes, vote, user, id, answers } = s

      return (
        <div className='page-container'>
          <Header />
          <div className='page-content-wrapper'>
            <div className='content'>
              <div className='jumbotron' data-pages='parallax'>
                <div className='container-fluid container-fixed-lg'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <h3>{communityName}</h3>
                    </div>

                  </div>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <button
                        data-toggle='modal'
                        data-target='#modalFillIn'
                        className='btn btn-primary btn-rounded btn-primary m-t-10'
                      >
                        {vote ? 'Answer Your Question' : 'Answer Question'}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
              <div className='container-fluid container-fixed-lg'>
                <div className='row padding-20'>
                  <div className='col-md-12'>
                    <div className='row'>
                      <div className='col-md-12 '>
                        <div className='pull-left sm-pull-reset'>
                          <CardStatTag title='Answers' stat={0} />
                          <CardStatTag title='Views' stat={0} />
                          <CardStatTag
                            title='Votes'
                            stat={upvotes - downvotes}
                          />
                        </div>
                        <div className='pull-right sm-pull-reset'>
                          <UpvoteWrapper className='btn-group'>
                            <VoteButton
                              onClick={this._handleUpvote(id)}
                              icon='fa-angle-double-up'
                              active={vote === 'u'}
                            />
                            <VoteButton
                              onClick={this._handleDownvote(id)}
                              icon='fa-angle-double-down'
                              active={vote === 'd'}
                            />
                          </UpvoteWrapper>
                        </div>

                      </div>
                    </div>
                    <h1>{title}</h1>
                    <div className='row m-t-15'>
                      <QuillWrapper className='col-md-8 m-b-15 m-l-15'>
                        <ReactQuill value={content} theme={null} readOnly />
                      </QuillWrapper>
                    </div>
                    <div className='row'>
                      <div className='col-md-12'>
                        <InlineAvatar profile={user} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className='container-fluid container-fixed-lg m-t-30'>
                <MapAnswersContainer
                  amount={2}
                  skip={0}
                  answers={answers}
                  ui={this.props.ui}
                />
              </div>
            </div>
            <Footer />
          </div>
          <ModalFill>
            <CreateAnswerPage cb={this.updateQuery} question={s} />
          </ModalFill>
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
  _handleUpvote = id => async e => {
    const { upvoteQuestion } = this.props.QuestionStore
    upvoteQuestion(id)
    // const q = this.props.singleQuestion.Question
    // const userId = this.props.user.profile.id
    // const questionId = q.id
    // try {
    //   if (this.upvoteActive()) {
    //     await this.props.neutralize({
    //       variables: {
    //         userId,
    //         questionId
    //       }
    //     })
    //   } else {
    //     await this.props.upvote({
    //       variables: {
    //         userId,
    //         questionId
    //       }
    //     })
    //   }
    // } catch (err) {
    //   console.log(err)
    // }
  }
  _handleDownvote = id => async e => {
    const { downvoteQuestion } = this.props.QuestionStore
    downvoteQuestion(id)
    // const q = this.props.singleQuestion.Question
    // const userId = this.props.user.profile.id
    // const questionId = q.id
    // try {
    //   if (this.downvoteActive()) {
    //     await this.props.neutralize({
    //       variables: {
    //         userId,
    //         questionId
    //       }
    //     })
    //   } else {
    //     await this.props.downvote({
    //       variables: {
    //         userId,
    //         questionId
    //       }
    //     })
    //   }
    // } catch (err) {
    //   console.log(err)
    // }
  }
}

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 0;
  }
`

const UpvoteWrapper = styled.div`
  a {
    color: #626262;
  }
`

export default graphql(singleQuestionQuery, {
  name: 'singleQuestion',
  options: ({ match: { params: { id } } }) => ({
    variables: {
      id
    }
  })
})(SingleQuestionPage)
