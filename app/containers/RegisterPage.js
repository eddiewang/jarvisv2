import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
// import notify from '.controllers/Notifications'
// import { capitalize, checkEmpty } from './helper/helper'
import { extendObservable } from 'mobx'
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

@inject('UserStore')
@observer
class RegisterPage extends Component {
  componentDidMount () {
    extendObservable(this, defaultRegistrationState)
  }
  handleForm = e => {
    const { name, value } = e.target
    this[name] = value
  }
  handleRegister = async e => {
    e.preventDefault()
    const { firstName, lastName, jobRole, email, password } = this
    const { register, saveTokens } = this.props.UserStore
    const userObject = {
      firstName,
      lastName,
      jobRole,
      email,
      password
    }
    try {
      const response = await register(userObject)
      const { data: { register: { ok, user, errors } } } = response
      console.log(ok, user, errors)
    } catch (err) {
      console.log('err', err)
    }
    // if (ok && token && refreshToken) {
    //   saveTokens(token, refreshToken)
    //   this.success = true
    // }
  }
  render () {
    const { firstName, lastName, jobRole, email, password, success } = this
    return (
      <div className='register-container full-height sm-p-t-30'>
        {success && <Redirect to='/verify' />}
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
                    name='firstName'
                    placeholder='John'
                    className='form-control'
                    required
                    value={firstName}
                    onChange={this.handleForm}
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group form-group-default'>
                  <label>Last Name</label>
                  <input
                    type='text'
                    name='lastName'
                    placeholder='Travolta'
                    className='form-control'
                    required
                    value={lastName}
                    onChange={this.handleForm}
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
                    name='jobRole'
                    placeholder='Electrifying Engineer (this can be changed later)'
                    className='form-control'
                    value={jobRole}
                    onChange={this.handleForm}
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
                    name='password'
                    placeholder='Minimum of 4 Charactors'
                    className='form-control'
                    onChange={this.handleForm}
                    value={password}
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
                    onChange={this.handleForm}
                    value={email}
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
              onClick={this.handleRegister}
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

export default RegisterPage
