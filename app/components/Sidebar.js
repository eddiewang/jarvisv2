import React, { Component } from 'react'

// Components
import Logo from './Logo'
import { Link } from 'react-router-dom'
import SidebarLink from 'components/SidebarLink'
import { inject, observer } from 'mobx-react'
import graphql from 'mobx-apollo'
import { extendObservable } from 'mobx'
import client from '../apollo'
import { allCommunitiesQuery } from 'controllers/Community'

@inject('CommunityStore')
@observer
class Sidebar extends Component {
  constructor (props) {
    super(props)
    extendObservable(this, {
      get allCommunities () {
        return graphql({ client, query: allCommunitiesQuery })
      }
    })
  }
  mapLinks = () => {
    const { allCommunities } = this
    if (!allCommunities.loading && !allCommunities.error) {
      return allCommunities.data.allCommunities.map(c => (
        <SidebarLink key={c.id} community={c} />
      ))
    }
  }
  render () {
    return (
      <nav className='page-sidebar' data-pages='sidebar'>
        <div className='sidebar-overlay-slide from-top' id='appMenu' />
        <Link to='/app/stream/all' className='sidebar-header'>
          <Logo className='brand' />
        </Link>
        <div className='sidebar-menu'>
          <ul className='menu-items'>
            <li className='m-t-30'>
              <Link to='/app/stream/all' className='detailed'>
                <span className='title'>Stream</span>
                <span className='details'>10 new questions</span>
              </Link>
              <span className='icon-thumbnail '>
                <i data-feather='activity' />
              </span>
            </li>
            {this.mapLinks()}
          </ul>
          <div className='clearfix' />
        </div>
      </nav>
    )
  }
}

export default Sidebar
