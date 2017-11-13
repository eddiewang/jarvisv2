import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
// import notify from 'controllers/Notifications'
// Components
import Logo from 'components/Logo'
import { Link } from 'react-router-dom'
// Graphql
// import { graphql, compose } from 'react-apollo'
// import { signin } from 'controllers/Auth'

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const i = getRandomInt(1, 4)
const dfbg = require(`../assets/digital-factory-bg-${i}.jpg`)

const defaultLoginState = {
  email: null,
  password: null
}

@inject('mainStore')
@observer
class LoginPage extends Component {
  render () {
    return (
      <div className='login-wrapper '>
        <div className='bg-pic'>

          <img
            src={dfbg}
            data-src={dfbg}
            data-src-retina={dfbg}
            alt='Digital Factory'
            className='lazy'
          />

          <div className='bg-caption pull-bottom sm-pull-bottom text-white p-l-20 m-b-20'>
            <h2 className='semi-bold text-white'>
              Jarvis helps you get your questions answered faster
            </h2>
            <p className='small'>
              This is a private Q&A platform that aims to encourage answer sharing and knowledge rentention at the bank
            </p>
          </div>

        </div>

        <div className='login-container bg-white'>
          <div className='p-l-50 m-l-20 p-r-50 m-r-20 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40'>
            <Logo />
            <p className='p-t-35'>Sign into your pages account</p>

            <form id='form-login' className='p-t-15' role='form' onSubmit={this._handleLogin}>

              <div className='form-group form-group-default'>
                <label>Login</label>
                <div className='controls'>
                  <input
                    type='email'
                    name='email'
                    value={''}
                    onChange={this._eChange}
                    placeholder='user@scotiabank.com'
                    className='form-control'
                    required
                  />
                </div>
              </div>

              <div className='form-group form-group-default'>
                <label>Password</label>
                <div className='controls'>
                  <input
                    type='password'
                    className='form-control'
                    name='password'
                    value={''}
                    onChange={this._pChange}
                    placeholder='hunter22'
                    required
                  />
                </div>
              </div>

              <div className='row'>
                <div className='col-md-6 no-padding sm-p-l-10'>
                  <div className='checkbox '>
                    <input type='checkbox' value='1' id='checkbox1' />
                    <label htmlFor='checkbox1'>Keep Me Signed in</label>
                  </div>
                </div>
              </div>

              <button type='submit' className='btn btn-primary btn-cons m-t-10'>
                Sign in
              </button>
            </form>

            <div className='pull-bottom sm-pull-bottom'>
              <div className='m-b-30 p-r-80 sm-m-t-20 sm-p-r-15 sm-p-b-20 clearfix'>

                <div className='col-sm-9 no-padding m-t-10'>
                  <p>
                    <small>
                      If this is your first time,
                      {' '}
                      <Link to='/register'>create a Jarvis account</Link>
                      . You will need a valid Scotiabank email to signup.
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
  _pChange = e => {}
  _eChange = e => {}
  _handleLogin = async e => {}
}

// const appWithApollo = compose(graphql(signin, { name: 'signin' }))(LoginPage)

export default LoginPage
