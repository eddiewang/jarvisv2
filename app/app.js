import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from 'containers/Landing'

import { Provider } from 'mobx-react'
import { MainStore } from 'stores/MainStore'

import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client-preset'

import LoginPage from 'containers/LoginPage'

const client = new ApolloClient()

class App extends React.Component {
  mainStore = new MainStore()

  render () {
    return (
      <ApolloProvider client={client}>
        <Provider mainStore={this.mainStore}>
          <Router>
            <div className='app'>
              <Route exact path='/' component={LoginPage} />
            </div>
          </Router>
        </Provider>
      </ApolloProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
