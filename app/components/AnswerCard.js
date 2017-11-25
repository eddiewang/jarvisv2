import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'
// Components
import InlineAvatar from 'components/InlineAvatar'
import ReactQuill from 'react-quill'
import VoteButton from 'components/VoteButton'
import CardStatTag from 'components/CardStatTag'
// GraphQl
// import {
//   upvoteAnswer,
//   downvoteAnswer,
//   neutralizeAnswer
// } from '../controllers/Voting'
import { graphql, compose } from 'react-apollo'
@inject('UserStore', 'AnswerStore')
@observer
class AnswerCard extends Component {
  state = {
    active: false
  }
  render () {
    const { vote, user, content, upvotes, downvotes } = this.props.profile
    return (
      <div
        className='card-block no-padding'
        onMouseOver={this._setActive}
        onMouseOut={this._setDeactive}
      >
        <div className='card card-default'>
          <div className='card-header m-b-20'>
            <div className='row'>
              <div className='col-md-6'>
                <InlineAvatar profile={user} />
              </div>
              <div className='col-md-6 text-right'>
                {/* {isOwnAnswer ? <CardStatTag stat='Self Answer' /> : null} */}
                <CardStatTag title={'Upvotes'} stat={upvotes - downvotes} />
                <div className='btn-group m-l-15'>
                  <VoteButton
                    onClick={this._handleUpvote}
                    active={vote === 'u'}
                    icon='fa-angle-double-up'
                  />
                  <VoteButton
                    onClick={this._handleDownvote}
                    active={vote === 'd'}
                    icon='fa-angle-double-down'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='card-block'>
            <div className='row'>
              <div className='col-md-12'>
                <QuillWrapper>
                  <ReactQuill value={content} theme={null} readOnly />
                </QuillWrapper>
              </div>
            </div>
            <b />
          </div>
          <BottomWrapper className='card-header p-b-20 text-right'>
            <button
              className={`btn btn-default ${this.state.active ? 'show' : ''}`}
            >
              Pick Best Answer
            </button>
          </BottomWrapper>
        </div>
      </div>
    )
  }
  _setActive = () => {
    this.setState({
      active: true
    })
  }
  _setDeactive = () => {
    this.setState({
      active: false
    })
  }
  _handleUpvote = async e => {
    const { upvoteAnswer } = this.props.AnswerStore
    const { id } = this.props.profile
    upvoteAnswer(id)
  }
  _handleDownvote = async e => {
    const { downvoteAnswer } = this.props.AnswerStore
    const { id } = this.props.profile
    downvoteAnswer(id)
  }
}

const QuillWrapper = styled.div`
  .ql-editor {
    padding-left: 20px;
  }
`

const BottomWrapper = styled.div`
  height: 80px;
  .btn {
    opacity: 0;
    transition: all 2s;
  }
  .show {
    opacity: 1;
  }
`

// const appWithApollo = compose(
//   graphql(upvoteAnswer, { name: 'upvote' }),
//   graphql(downvoteAnswer, { name: 'downvote' }),
//   graphql(neutralizeAnswer, { name: 'neutralize' })
// )(AnswerCard)

export default AnswerCard
