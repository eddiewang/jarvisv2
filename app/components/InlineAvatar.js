import React, { Component } from 'react'
import { avatarApi } from 'utils/helper'
import { inject, observer } from 'mobx-react'

@inject('UserStore')
@observer
class InlineAvatar extends Component {
  render () {
    const { firstName, lastName, jobRole, id } = this.props.profile
    const avatarUrl = avatarApi(id)
    const name = firstName + ' ' + lastName
    return (
      <div>
        <div className='profile-img-wrapper m-t-5 inline'>
          <img
            width='35'
            height='35'
            data-src-retina={avatarUrl}
            data-src={avatarUrl}
            alt='avatar'
            src={avatarUrl}
          />
          <div className='chat-status available' />
        </div>
        <div className='inline m-l-10'>
          <p className='small hint-text m-t-5'>
            <span className='bold'>
              {name}
            </span>
            {' '}
            <br />
            {jobRole}
          </p>
        </div>
      </div>
    )
  }
}

export default InlineAvatar
