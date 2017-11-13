import React, { Component } from 'react'
import logo from '../assets/logo.png'
import logo2x from '../assets/logo@2x.png'

class Logo extends Component {
  render () {
    const { width, height } = this.props
    return (
      <img
        src={logo}
        alt='logo'
        data-src={logo2x}
        data-src-retina={logo2x}
        width={width || '78'}
        height={height || '22'}
      />
    )
  }
}

export default Logo
