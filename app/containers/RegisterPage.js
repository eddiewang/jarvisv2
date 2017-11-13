import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
// import notify from '.controllers/Notifications'
// import { capitalize, checkEmpty } from './helper/helper'
import Logo from 'components/Logo'

const defaultRegistrationState = {
  firstname: '',
  lastname: '',
  jobRole: '',
  password: '',
  email: '',
  profilePic: null,
  success: false
}

@inject('mainStore')
@observer
class RegisterPage extends Component {
  render () {
    const registration = defaultRegistrationState
    return (
      <div className='register-container full-height sm-p-t-30'>
        {registration.success && <Redirect to='/verify' />}
        <div className='d-flex justify-content-center flex-column full-height '>
          <Logo />
          <h3>
            Welcome! We're excited to have you on board.
          </h3>
          <p>
            We'll need to basic details about yourself, so others can better understand your experience & expertise.
          </p>
          <form id='form-register' className='p-t-15' role='form'>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group form-group-default'>
                  <label>First Name</label>
                  <input
                    type='text'
                    name='fname'
                    placeholder='John'
                    className='form-control'
                    required
                    value={registration.firstname}
                    onChange={this._fnChange}
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group form-group-default'>
                  <label>Last Name</label>
                  <input
                    type='text'
                    name='lname'
                    placeholder='Travolta'
                    className='form-control'
                    required
                    value={registration.lastname}
                    onChange={this._lnChange}
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <div className='form-group form-group-default'>
                  <label>Job Role</label>
                  <input
                    type='text'
                    name='uname'
                    placeholder='Electrifying Engineer (this can be changed later)'
                    className='form-control'
                    value={registration.jobRole}
                    onChange={this._jrChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <div className='form-group form-group-default'>
                  <label>Password</label>
                  <input
                    type='password'
                    name='pass'
                    placeholder='Minimum of 4 Charactors'
                    className='form-control'
                    onChange={this._pwChange}
                    value={registration.password}
                    required
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <div className='form-group form-group-default'>
                  <label>Email</label>
                  <input
                    type='email'
                    name='email'
                    placeholder='We will send activation email to you'
                    className='form-control'
                    onChange={this._eChange}
                    value={registration.email || ''}
                    required
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <h5>Upload an Avatar</h5>
              </div>

            </div>
            <div className='row m-t-10'>
              <div className='col-lg-6'>
                <p>
                  <small>
                    Ready for liftoff?
                  </small>
                </p>
              </div>
            </div>
            <button
              onClick={this._handleSignup}
              className='btn btn-primary btn-cons m-t-10'
              type='submit'
            >
              Create a new account
            </button>
          </form>
        </div>
      </div>
    )
  }
  _fnChange = e => {}
  _lnChange = e => {}
  _jrChange = e => {}
  _pwChange = e => {}
  _eChange = e => {}
  _handleSignup = async e => {
    e.preventDefault()
  }
}

// const DropzoneStyled = styled(Dropzone)`
//   display: flex;
//   cursor: pointer;
//   margin-top: 10px;
//   align-items: center;
//   justify-content: center;
//   border: 1px solid #51646b;
//   height: 80px;
// `

// const appWithApollo = compose(
//   graphql(signup, { name: 'signup' }),
//   graphql(setAvatar, { name: 'setAvatar' })
// )(RegisterPage)

export default RegisterPage
