import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { capitalize } from 'utils/helper'
// Components
import Header from 'components/Header'
import Footer from 'components/Footer'
import { toJS, extendObservable } from 'mobx'

import graphql from 'mobx-apollo'
import client from '../apollo'
import { meQuery } from 'controllers/User'

@inject('UserStore')
@observer
class ProfilePage extends Component {
  constructor (props) {
    super(props)
    extendObservable(this, {
      get me () {
        return graphql({ client, query: meQuery })
      }
    })
  }
  render () {
    if (!this.me.loading) {
      const { me } = this.me.data

      return (
        <div className='page-container'>
          <Header />
          <div className='page-content-wrapper'>
            <div className='content'>
              <div className='jumbotron' data-pages='parallax'>
                <div className='container-fluid container-fixed-lg'>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <h3>
                        {capitalize(me.firstName)}
                        {' '}
                        {capitalize(me.lastName)}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className='container-fluid container-fixed-lg'>
                <h4>Stats</h4>
                <div className='card-block no-padding'>
                  <div className='card card-default'>
                    <div className='card-block'>
                      <div className='row'>
                        <div className='col-md-6'>
                          <h4>Karma Coins</h4>

                          <h4 className='semi-bold text-danger'>
                            550 <i className='fa fa-money' />{' '}
                          </h4>
                          {' '}

                        </div>
                        <div className='col-md-6'>
                          <h4>
                            Next Level:
                            {' '}
                            <span className='semi-bold'>GraphQL Expert</span>
                          </h4>
                          <div className='progress'>
                            <div className='progress-bar-indeterminate' />
                          </div>
                          <div className='progress'>
                            <div
                              className='progress-bar progress-bar-primary'
                              style={{ width: '50%' }}
                            />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <h4>Edit Profile</h4>
                <div className='card-block no-padding'>
                  <div className='card card-default'>
                    <div className='card-block'>
                      <form id='form-register' className='p-t-15' role='form'>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='form-group form-group-default'>
                              <label>First Name</label>
                              <input
                                type='text'
                                name='fname'
                                placeholder='John'
                                value={me.firstName}
                                className='form-control'
                                required
                              />
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='form-group form-group-default'>
                              <label>Last Name</label>
                              <input
                                type='text'
                                name='lname'
                                value={me.lastName}
                                placeholder='Travolta'
                                className='form-control'
                                required
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
                                value={me.jobRole}
                                className='form-control'
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-12'>
                            <div className='form-group form-group-default'>
                              <label>Change Password</label>
                              <input
                                type='password'
                                name='pass'
                                placeholder='Minimum of 4 Charactors'
                                className='form-control'
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
                                value={me.email}
                                className='form-control'
                                disabled='disabled'
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          className='btn btn-primary btn-cons m-t-10'
                          type='submit'
                        >
                          Update
                        </button>
                      </form>
                    </div>

                  </div>
                </div>
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

export default ProfilePage
