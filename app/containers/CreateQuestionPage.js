import React, { Component } from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { extendObservable } from 'mobx'
import notify from 'utils/notification'
import { checkEmpty, capitalize } from 'utils/helper'
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

@inject('UserStore', 'CommunityStore', 'QuestionStore')
@observer
class CreateQuestionPage extends Component {
  constructor (props) {
    super(props)
    extendObservable(this, defaultAskState)
  }
  componentDidMount () {
    window.$('.ql-toolbar').find(':button').attr('tabindex', '-1')
  }
  selectCommunity = id => () => {
    this.category = id
  }
  mapCommunities = () => {
    const { allCommunities } = this.props.CommunityStore

    if (!allCommunities.loading && !allCommunities.error) {
      return allCommunities.data.allCommunities.map(c => (
        <CommunityTag
          onSelect={this.selectCommunity}
          selectedCategory={this.category}
          name={capitalize(c.name)}
          id={c.id}
          key={c.id}
        />
      ))
    }
  }
  render () {
    const { category, title, content, anonymous, pending } = this

    if (category && !pending) {
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
                          {this.mapCommunities()}
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
    const { title, content, category } = this
    console.log(title, content, category)
    if (typeof category !== 'number') {
      notify({
        style: 'bar',
        position: 'top-right',
        message: 'Please set a category',
        type: 'warning',
        showClose: false,
        timeout: 2000
      })
    } else if (checkEmpty(title)) {
      notify({
        style: 'bar',
        position: 'top-right',
        message: 'Please set a question title',
        type: 'warning',
        showClose: false,
        timeout: 2000
      })
    } else if (checkEmpty(content)) {
      notify({
        style: 'bar',
        position: 'top-right',
        message: 'Please add more question content information',
        type: 'warning',
        showClose: false,
        timeout: 2000
      })
    } else {
      try {
        await this.props.QuestionStore.createQuestion({
          title,
          content,
          communityId: category
        })
        this.pending = false
      } catch (err) {
        // TODO implement error notify
        console.log(err)
        notify({
          style: 'bar',
          position: 'top-right',
          message: 'Error posting question.',
          type: 'danger',
          showClose: false,
          timeout: 2000
        })
      }
    }
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
