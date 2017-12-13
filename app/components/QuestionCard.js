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

@inject('UserStore', 'QuestionStore')
@observer
class QuestionCard extends Component {
  voteCount = () => {
    const { upvotes, downvotes } = this.props.details
    return upvotes - downvotes
  }
  render () {
    const { title, content, user, id, community, vote } = this.props.details
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
                        <Link to={`/app/stream/${community.id}`}>
                          {capitalize(category)}
                        </Link>
                      </button>}
                    <VoteButton
                      onClick={this._handleUpvote}
                      icon='fa-angle-double-up'
                      active={vote === 'u'}
                    />
                    <VoteButton
                      onClick={this._handleDownvote}
                      icon='fa-angle-double-down'
                      active={vote === 'd'}
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
    const { upvoteQuestion } = this.props.QuestionStore
    const { id } = this.props.details
    upvoteQuestion(id)
  }
  _handleDownvote = async e => {
    const { downvoteQuestion } = this.props.QuestionStore
    const { id } = this.props.details
    downvoteQuestion(id)
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

// const appWithApollo = compose(
//   graphql(upvoteQuestion, { name: 'upvote' }),
//   graphql(downvoteQuestion, { name: 'downvote' }),
//   graphql(neutralizeQuestion, { name: 'neutralize' })
// )(QuestionCard)

export default withRouter(QuestionCard)
