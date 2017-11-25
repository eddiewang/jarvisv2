import React, { Component } from 'react'
// Components
import AnswerCard from 'components/AnswerCard'

class MapAnswersContainer extends Component {
  voteCount = a => {
    return a.upvotes.length - a.downvotes.length
  }
  render () {
    return (
      <div>
        {this._mapCards()}
      </div>
    )
  }
  _mapCards = () => {
    return this.props.answers
      .slice()
      .sort((x, y) => this.voteCount(x) < this.voteCount(y))
      .map(a => {
        return <AnswerCard key={a.id} profile={a} />
      })
  }
}

export default MapAnswersContainer
