import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { extendObservable } from 'mobx'

@observer class CommunityTag extends Component {
  render () {
    const { name, onSelect, selectedCategory, id } = this.props
    console.log(selectedCategory)
    return (
      <button
        onClick={onSelect(id)}
        className={`btn btn-tag btn-tag-${selectedCategory === id ? 'light' : 'dark'} btn-tag-rounded m-r-20 m-b-10 m-t-10`}
      >
        {name}
      </button>
    )
  }
}

export default CommunityTag
