import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
// Components
import Sidebar from 'components/Sidebar'
// import Overlay from './components/Overlay'
// Pages
import StreamPage from 'containers/StreamPage'
// import SingleQuestionPage from './SingleQuestionPage'
import CreateQuestionPage from './CreateQuestionPage'
// import ProfilePage from './ProfilePage'

@inject('UserStore')
@observer
class AppContainer extends Component {
  render () {
    const { match } = this.props
    return (
      <MainContainer>
        <Sidebar />
        <Route
          exact
          path={`${match.url}/stream/:category`}
          component={StreamPage}
        />
        <Route exact path={`${match.url}/ask`} component={CreateQuestionPage} />
      </MainContainer>
    )
  }
}

const MainContainer = styled.div`
  height: 100%;
`

export default AppContainer
