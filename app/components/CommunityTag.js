import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { extendObservable } from 'mobx'

@observer class CommunityTag extends Component {
  render () {
    const { name, onSelect } = this.props
    return (
      <button
        onClick={onSelect(name)}
        className={`btn btn-tag btn-tag-${this.props.ui.ask.category === name ? 'light' : 'dark'} btn-tag-rounded m-r-20 m-b-10 m-t-10`}
      >
        {name}
      </button>
    )
  }
}

export default CommunityTag
