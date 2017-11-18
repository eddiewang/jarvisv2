import React, { Component } from 'react'

// Components
import Logo from './Logo'
import { Link } from 'react-router-dom'

class Sidebar extends Component {
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
            <li className=''>
              <Link to='/app/stream/design'>
                <span className='title'>Design</span>
              </Link>
              <span className='icon-thumbnail '>
                <i data-feather='codepen' />
              </span>
            </li>
            <li className=''>
              <Link to='/app/stream/code'>
                <span className='title'>Code</span>
              </Link>
              <span className='icon-thumbnail'>
                <i data-feather='server' />
              </span>
            </li>
            <li className=''>
              <Link to='/app/stream/people'>
                <span className='title'>People</span>
              </Link>
              <span className='icon-thumbnail'>
                <i data-feather='users' />
              </span>
            </li>
            <li className=''>
              <Link to='/app/stream/product'>
                <span className='title'>Product</span>
              </Link>
              <span className='icon-thumbnail'>
                <i data-feather='target' />
              </span>
            </li>
          </ul>
          <div className='clearfix' />
        </div>
      </nav>
    )
  }
}

export default Sidebar
