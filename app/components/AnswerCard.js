import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'
import { checkId } from 'utils/helper'
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
@inject('user')
@observer
class AnswerCard extends Component {
  state = {
    active: false
  }
  upvoteActive = () => {
    return (
      checkId(this.props.profile.upvotes, this.props.user.profile.id).length > 0
    )
  }
  downvoteActive = () => {
    return (
      checkId(this.props.profile.downvotes, this.props.user.profile.id).length >
      0
    )
  }
  voteCount = () => {
    const uData = this.props.profile.upvotes
    const dData = this.props.profile.downvotes
    return uData.length - dData.length
  }
  render () {
    const { profile } = this.props
    // const isOwnAnswer =
    //   this.props.profile.user.id === this.props.user.profile.id
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
                <InlineAvatar profile={profile.user} />
              </div>
              <div className='col-md-6 text-right'>
                {/* {isOwnAnswer ? <CardStatTag stat='Self Answer' /> : null} */}
                <CardStatTag title={'Upvotes'} stat={this.voteCount()} />
                <div className='btn-group m-l-15'>
                  <VoteButton
                    onClick={this._handleUpvote}
                    active={this.upvoteActive()}
                    icon='fa-angle-double-up'
                  />
                  <VoteButton
                    onClick={this._handleDownvote}
                    active={this.downvoteActive()}
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
                  <ReactQuill value={profile.content} theme={null} readOnly />
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
    const userId = this.props.user.profile.id
    const answerId = this.props.profile.id
    try {
      if (this.upvoteActive()) {
        await this.props.neutralize({
          variables: {
            userId,
            answerId
          }
        })
      } else {
        await this.props.upvote({
          variables: {
            userId,
            answerId
          }
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  _handleDownvote = async e => {
    const userId = this.props.user.profile.id
    const answerId = this.props.profile.id
    try {
      if (this.downvoteActive()) {
        await this.props.neutralize({
          variables: {
            userId,
            answerId
          }
        })
      } else {
        await this.props.downvote({
          variables: {
            userId,
            answerId
          }
        })
      }
    } catch (err) {
      console.log(err)
    }
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
