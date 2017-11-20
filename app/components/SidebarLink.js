import React, { Component } from 'react'
import { capitalize } from 'utils/helper'
import { Link } from 'react-router-dom'

class SidebarLink extends Component {
  render () {
    const { id, name, icon } = this.props.community
    return (
      <li className=''>
        <Link to={`/app/stream/${id}`}>
          <span className='title'>{capitalize(name)}</span>
        </Link>
        <span className='icon-thumbnail'>
          <i data-feather={icon} />
        </span>
      </li>
    )
  }
}

export default SidebarLink
