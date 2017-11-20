import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { capitalize } from 'utils/helper'
// Components
import Header from 'components/Header'
import Footer from 'components/Footer'
// Containers
import MapQuestions from 'components/MapQuestions'
import { graphql, compose } from 'react-apollo'
import { communityQuery } from 'controllers/Community'

@inject('UserStore')
@observer
class StreamPage extends Component {
  render () {
    const { category } = this.props.match.params
    if (category === 'all' || !this.props.data.loading) {
      const name = category === 'all'
        ? category
        : this.props.data.community.name
      return (
        <div className='page-container'>
          <Header />
          <div className='page-content-wrapper'>
            <div className='content'>
              <div className='jumbotron' data-pages='parallax'>
                <div className='container-fluid container-fixed-lg'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <h3>{capitalize(name)}</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className='container-fluid container-fixed-lg'>
                <MapQuestions amount={1} skip={0} communityId={category} />
              </div>
            </div>
            <Footer />
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default graphql(communityQuery, {
  skip: props => props.match.params.category === 'all',
  options: ({ match: { params: { category } } }) => {
    return {
      variables: {
        id: category
      }
    }
  }
})(StreamPage)
