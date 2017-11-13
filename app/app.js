import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from 'containers/Landing'
import styled from 'styled-components'

import { Provider } from 'mobx-react'
import { MainStore } from 'stores/MainStore'
import { OnUpdate } from 'rrc'

import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client-preset'

import LoginPage from 'containers/LoginPage'

const client = new ApolloClient()

const runScripts = () => {
  const $ = window.$
  const feather = window.feather
  setTimeout(() => {
    $.Pages.init()
    $('[data-pages="search"]').search({
      searchField: '#overlay-search',
      closeButton: '.overlay-close',
      suggestions: '#overlay-suggestions',
      brand: '.brand',
      onSearchSubmit: function (searchString) {
        // console.log('Search for: ' + searchString)
      },
      onKeyEnter: function (searchString) {
        // console.log('SEARCH: ' + searchString)
        // var searchField = $('#overlay-search')
        // var searchResults = $('.search-results')
        // clearTimeout($.data(this, 'timer'))
        // searchResults.fadeOut('fast')
        // var wait = setTimeout(function () {
        //   searchResults.find('.result-name').each(function () {
        //     if (searchField.val().length !== 0) {
        //       $(this).html(searchField.val())
        //       searchResults.fadeIn('fast')
        //     }
        //   })
        // }, 500)
        // $(this).data('timer', wait)
      }
    })
    feather.replace({
      width: 16,
      height: 16
    })
  }, 1000)
}

class App extends React.Component {
  mainStore = new MainStore()

  render () {
    return (
      <ApolloProvider client={client}>
        <Provider mainStore={this.mainStore}>
          <Router>
            <MainContainer className='app'>
              <OnUpdate immediate call={runScripts} />
              <Route exact path='/' component={LoginPage} />
            </MainContainer>
          </Router>
        </Provider>
      </ApolloProvider>
    )
  }
}

const MainContainer = styled.div`
  height: 100%;
`

ReactDOM.render(<App />, document.getElementById('root'))
