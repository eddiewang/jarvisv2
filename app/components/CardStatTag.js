import React, { Component } from 'react'

class CardStatTag extends Component {
  render () {
    return (
      <p className='inline small hint-text m-t-10 m-r-15'>
        <span className='label m-r-5'>{this.props.stat}</span>
        {this.props.title}
      </p>
    )
  }
}

export default CardStatTag
