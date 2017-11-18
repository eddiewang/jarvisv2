import React, { Component } from 'react'

class VoteButton extends Component {
  render () {
    return (
      <button
        onClick={this.props.onClick}
        type='button'
        className={`btn btn-sm btn-${this.props.active ? 'primary' : 'default'}`}
      >
        <i className={`fa ${this.props.icon}`} />
      </button>
    )
  }
}

export default VoteButton
