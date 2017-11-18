import React, { Component } from 'react'

class Footer extends Component {
  render () {
    return (
      <div className='container-fluid container-fixed-lg footer'>
        <div className='copyright sm-text-center'>
          <p className='small no-margin pull-left sm-pull-reset'>
            <span className='font-montserrat'>Scotiabank Digital</span>
          </p>
          <p className='small no-margin pull-right sm-pull-reset'>
            <a href='http://digitalfactory.scotiabank.com/' target='blank'>
              Digital Factory
            </a>
            <span className='hint-text'> Intern Initiative</span>
          </p>
          <div className='clearfix' />
        </div>
      </div>
    )
  }
}

export default Footer
