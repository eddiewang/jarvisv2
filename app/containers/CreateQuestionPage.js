import React, { Component } from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { extendObservable } from 'mobx'
import notify from 'utils/notification'
import { checkEmpty } from 'utils/helper'
// Graphql
// import { createQuestion } from '.controllers/Post'
import { graphql, compose } from 'react-apollo'
// Components
import Header from 'components/Header'
import CommunityTag from 'components/CommunityTag'
import { Redirect } from 'react-router-dom'
// Assets
import ReactQuill from 'react-quill'

const defaultAskState = {
  title: '',
  category: '',
  content: '',
  anonymous: false,
  pending: true
}

const rq = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'blockquote'],
    ['code-block'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link']
  ]
}
@inject('UserStore')
@observer
class CreateQuestionPage extends Component {
  componentDidMount () {
    extendObservable(this, defaultAskState)
    window.$('.ql-toolbar').find(':button').attr('tabindex', '-1')
  }
  selectCommunity = name => () => {
    this.category = name
  }
  render () {
    const { category, title, content, anonymous, pending } = this
    if (category && !pending) {
      console.log('here')
      return <Redirect to={`/app/stream/${category}`} />
    } else {
      return (
        <div className='page-container'>
          <Header />
          <div className='page-content-wrapper'>
            <div className='content'>
              <div className='container-fluid container-fixed-lg'>
                <div className='card card-default'>
                  <div className='card-header'>
                    <div className='row'>
                      <div className='col-md-12'>
                        <div className='inline'>
                          <h4>Choose a Community</h4>
                          <CommunityTag
                            onSelect={this.selectCommunity}
                            name='Design'
                          />
                          <CommunityTag
                            onSelect={this.selectCommunity}
                            name='Code'
                          />
                          <CommunityTag
                            onSelect={this.selectCommunity}
                            name='People'
                          />
                          <CommunityTag
                            onSelect={this.selectCommunity}
                            name='Product'
                          />
                          <button
                            className={`btn btn-tag btn-tag-rounded m-r-20 m-b-10 m-t-10`}
                            disabled
                          >
                            Create A Community
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className='card-header'>
                    <div className='form-group form-group-default required'>
                      <label>Question Title</label>
                      <input
                        type='text'
                        className='form-control'
                        value={title || ''}
                        onChange={this._tChange}
                        required
                      />
                    </div>
                  </div>
                  <div className='card-block no-scroll card-toolbar'>
                    <SummernoteWrapper>
                      <ReactQuill
                        modules={rq}
                        value={content}
                        onChange={this._handleEditor}
                      />
                    </SummernoteWrapper>
                  </div>
                  <div className='card-footer'>
                    <button
                      onClick={this._createQuestion}
                      className='pull-right btn btn-rounded btn-primary'
                    >
                      Post Question
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )
    }
  }
  _tChange = e => {
    this.title = e.target.value
  }
  _handleEditor = e => {
    this.content = e
  }
  _createQuestion = async e => {
    // TODO frontend validation
    // const { ask } = this.props.ui
    // if (checkEmpty(ask.category)) {
    //   notify({
    //     style: 'bar',
    //     position: 'top-right',
    //     message: 'Please set a category',
    //     type: 'warning',
    //     showClose: false,
    //     timeout: 2000
    //   })
    // } else if (checkEmpty(ask.title)) {
    //   notify({
    //     style: 'bar',
    //     position: 'top-right',
    //     message: 'Please set a question title',
    //     type: 'warning',
    //     showClose: false,
    //     timeout: 2000
    //   })
    // } else if (checkEmpty(ask.content)) {
    //   notify({
    //     style: 'bar',
    //     position: 'top-right',
    //     message: 'Please add more question content information',
    //     type: 'warning',
    //     showClose: false,
    //     timeout: 2000
    //   })
    // } else {
    //   try {
    //     const { profile } = this.props.user
    //     await this.props.createQuestion({
    //       variables: {
    //         title: ask.title,
    //         content: ask.content,
    //         userId: profile.id,
    //         anonymous: ask.anonymous,
    //         category: ask.category.toLowerCase()
    //       }
    //     })
    //     ask.pending = false
    //   } catch (err) {
    //     // TODO implement error notify
    //     console.log(err)
    //     notify({
    //       style: 'bar',
    //       position: 'top-right',
    //       message: 'Error posting question.',
    //       type: 'danger',
    //       showClose: false,
    //       timeout: 2000
    //     })
    //   }
    // }
  }
}

const SummernoteWrapper = styled.div`
  .ql-editor {
    min-height: 300px;
    background-color: #FFF;
  }
  .ql-tooltip {
    z-index: 1000;
  }
`

export default CreateQuestionPage
