import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { capitalize } from 'utils/helper'
// Components
import Header from 'components/Header'
import Footer from 'components/Footer'
// Containers
import MapQuestions from 'components/MapQuestions'

@inject('UserStore')
@observer
class StreamPage extends Component {
  render () {
    const { category } = this.props.match.params
    return (
      <div className='page-container'>
        <Header />
        <div className='page-content-wrapper'>
          <div className='content'>
            <div className='jumbotron' data-pages='parallax'>
              <div className='container-fluid container-fixed-lg'>
                <div className='row'>
                  <div className='col-sm-12'>
                    <h3>{capitalize(category)}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className='container-fluid container-fixed-lg'>
              <MapQuestions amount={2} skip={0} category={category} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default StreamPage
