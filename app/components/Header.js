import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { toJS, extendObservable } from 'mobx'
import { capitalize, avatarApi } from 'utils/helper'
// Assets
import avatar from '../assets/avatar.png'
import avatar2x from '../assets/avatar@2x.png'

// Components
import { Link, withRouter } from 'react-router-dom'
import Logo from './Logo'
import graphql from 'mobx-apollo'
import client from '../apollo'
import { meQuery } from 'controllers/User'

@inject('UserStore')
@observer
class Header extends Component {
  constructor (props) {
    super(props)
    extendObservable(this, {
      get me () {
        return graphql({ client, query: meQuery })
      }
    })
  }
  render () {
    if (!this.me.loading) {
      const { me } = this
      const { firstName, lastName, id } = me.data.me
      const avatarUrl = avatarApi(id)

      return (
        <div className='header '>
          <a
            href='#'
            className='btn-link toggle-sidebar hidden-lg-up pg pg-menu'
            data-toggle='sidebar'
          />
          <div className=''>
            <Link to='/app/stream/all' className='brand inline'>
              <Logo />
            </Link>
            <Link
              to='/app/ask'
              className='btn btn-link text-primary m-l-20 hidden-md-down'
            >
              Ask New Question
            </Link>
            {/* <a
              href='#'
              className='search-link hidden-md-down'
              data-toggle='search'
            >
              <i className='pg-search' />
              Type anywhere to
              {' '}
              <span className='bold'>search</span>
            </a> */}
          </div>
          <div className='d-flex align-items-center'>
            {/* <ul className='hidden-md-down notification-list no-margin hidden-sm-down b-grey b-r no-style p-l-30 p-r-20'>
              <li className='p-r-10 inline'>
                <div className='dropdown'>
                  <a
                    href='#'
                    id='notification-center'
                    className='header-icon pg pg-world'
                    data-toggle='dropdown'
                  >
                    <span className='bubble' />
                  </a>
                  <div
                    className='dropdown-menu notification-toggle'
                    role='menu'
                    aria-labelledby='notification-center'
                  >
                    <div className='notification-panel'>
                      <div className='notification-body scrollable'>
                        <div className='notification-item unread clearfix'>
                          <div className='heading open'>
                            <a href='#' className='text-primary pull-left'>
                              <i className='pg-map fs-16 m-r-10' />
                              <span className='bold'>New Answer</span>
                              <span className='fs-12 m-l-10'>David Nester</span>
                            </a>
                            <div className='pull-right'>

                              <span className=' time'>few sec ago</span>
                            </div>
                          </div>

                        </div>
                      </div>

                      <div className='notification-footer text-center'>
                        <a href='#' className=''>Read all notifications</a>
                        <a
                          data-toggle='refresh'
                          className='portlet-refresh text-black pull-right'
                          href='#'
                        >
                          <i className='pg-refresh_new' />
                        </a>
                      </div>

                    </div>

                  </div>

                </div>
              </li>
            </ul> */}

            <div className='pull-left p-r-10 fs-14 font-heading hidden-md-down m-l-20'>
              <span className='semi-bold'>
                {capitalize(firstName)}
              </span>
              {' '}
              <span className='text-master'>
                {capitalize(lastName)}
              </span>
            </div>
            <div className='dropdown pull-right hidden-md-down'>
              <button
                className='profile-dropdown-toggle'
                type='button'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                <span className='thumbnail-wrapper d32 circular inline'>
                  <img src={avatarUrl} alt='' width='32' height='32' />
                </span>
              </button>
              <div
                className='dropdown-menu dropdown-menu-right profile-dropdown'
                role='menu'
              >
                <Link to='/app/profile' className='dropdown-item'>
                  <i className='pg-menu' /> Profile
                </Link>
                {/* <a href='#' className='dropdown-item'>
                  <i className='pg-refresh' /> Feedback
                </a> */}
                <a
                  onClick={this._logout}
                  className='clearfix bg-master-lighter dropdown-item'
                >
                  <span className='pull-left'>Logout</span>
                  <span className='pull-right'><i className='pg-power' /></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
  _logout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('refreshToken')
    this.props.UserStore.logout = true
  }
}

export default withRouter(Header)
