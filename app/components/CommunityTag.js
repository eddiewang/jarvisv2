import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('ui')
@observer
class CommunityTag extends Component {
  render () {
    const { name } = this.props
    return (
      <button
        onClick={this._setTag}
        className={`btn btn-tag btn-tag-${this.props.ui.ask.category === name ? 'light' : 'dark'} btn-tag-rounded m-r-20 m-b-10 m-t-10`}
      >
        {name}
      </button>
    )
  }
  _setTag = () => {
    this.props.ui.ask.category = this.props.name
  }
}

export default CommunityTag
