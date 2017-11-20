import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'
import { createPreview, checkId, capitalize } from 'utils/helper'
import { withRouter, Link } from 'react-router-dom'
// Graphql
import {
  upvoteQuestion,
  downvoteQuestion,
  neutralizeQuestion
} from '../controllers/Voting'
import { graphql, compose } from 'react-apollo'
// Components
import InlineAvatar from './InlineAvatar'
import CardStatTag from './CardStatTag'
import VoteButton from './VoteButton'

@inject('UserStore')
@observer
class QuestionCard extends Component {
  upvoteActive = () => {
    return true
    // return (
    //   checkId(this.props.details.upvotes, this.props.user.profile.id).length > 0
    // )
  }
  downvoteActive = () => {
    return false
    // return (
    //   checkId(this.props.details.downvotes, this.props.user.profile.id).length >
    //   0
    // )
  }
  voteCount = () => {
    // const uData = this.props.details.upvotes
    // const dData = this.props.details.downvotes
    // return uData.length - dData.length
    return 1
  }
  render () {
    const { title, content, user, id, community } = this.props.details
    const categoryEnabled = this.props.match.params.category === 'all'
    const category = community.name
    return (
      <div>
        <div className='card-block no-padding'>
          <div className='card card-default'>
            <CardSection>
              <div className='row'>
                <div className='col-md-12 text-right'>
                  <div className='btn-group m-r-15'>
                    {categoryEnabled &&
                      <button className='btn btn-tag btn-tag-light'>
                        <Link to={`/app/stream/${category}`}>
                          {capitalize(category)}
                        </Link>
                      </button>}
                    <VoteButton
                      onClick={this._handleUpvote}
                      icon='fa-angle-double-up'
                      active={this.upvoteActive()}
                    />
                    <VoteButton
                      onClick={this._handleDownvote}
                      icon='fa-angle-double-down'
                      active={this.downvoteActive()}
                    />
                  </div>

                </div>
              </div>
            </CardSection>
            <CardLink to={`/app/question/${id}`}>
              <h4>
                <span className='semi-bold'>
                  {title}
                </span>
              </h4>
              <p>
                {createPreview(content, 250)}
              </p>
              <b />
              <InlineAvatar profile={user} />
            </CardLink>
            <CardSection>
              <div className='row'>
                <div className='col-md-12 text-right'>
                  <CardStatTag title='Answers' stat={0} />
                  <CardStatTag title='Views' stat={0} />
                  <CardStatTag title='Votes' stat={this.voteCount()} />
                </div>
              </div>
            </CardSection>
          </div>
        </div>
      </div>
    )
  }
  _handleUpvote = async e => {
    // const userId = this.props.user.profile.id
    // const questionId = this.props.details.id
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
  _handleDownvote = async e => {
    // const userId = this.props.user.profile.id
    // const questionId = this.props.details.id
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

const CardLink = styled(Link)`
  color: #7a8994;
  padding-left: 30px;
  padding-right: 30px;
`

const CardSection = styled.div`
  margin-top: 10px;
  margin-bottom: 5px;
  a {
    color: #626262;
  }
`

const appWithApollo = compose(
  graphql(upvoteQuestion, { name: 'upvote' }),
  graphql(downvoteQuestion, { name: 'downvote' }),
  graphql(neutralizeQuestion, { name: 'neutralize' })
)(QuestionCard)

export default withRouter(QuestionCard)
