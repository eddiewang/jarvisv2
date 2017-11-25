import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'
import ReactQuill from 'react-quill'
import notify from 'controllers/Notifications'
import { checkEmpty } from 'utils/helper'
import { extendObservable } from 'mobx'
// Components
import InlineAvatar from 'components/InlineAvatar'
// Graphql
// import { createAnswer } from './controllers/Post'
import { graphql, compose, withApollo } from 'react-apollo'

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

const defaultAnswerState = {
  content: '',
  anonymous: false,
  pending: true
}

@withApollo
@inject('UserStore', 'AnswerStore')
@observer
class CreateAnswerPage extends Component {
  constructor (props) {
    super(props)
    extendObservable(this, defaultAnswerState)
  }

  render () {
    const { content, anonymous, pending } = this
    const { me } = this.props.UserStore
    if (!me.loading && me.data) {
      return (
        <div>
          <div className='modal-header'>
            <h5 className='text-left p-b-5'>
              <span className='semi-bold'>Answer</span> Question
            </h5>
          </div>
          <div className='modal-body'>
            <div className='row'>
              <div className='col-md-12'>
                <SummernoteWrapper>
                  <ReactQuill
                    modules={rq}
                    value={content}
                    onChange={this._handleEditor}
                  />
                </SummernoteWrapper>
              </div>

            </div>
            <div className='row'>
              <div className='col-md-6 m-t-15'>
                <InlineAvatar profile={me.data.me} />
              </div>
              <div className='text-right col-md-6 m-t-15'>
                <button
                  onClick={this._createQuestion}
                  type='button'
                  className='btn btn-primary btn-lg btn-large fs-15'
                  data-dismiss='modal'
                  aria-hidden='true'
                >
                  Post Answer
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
  _handleEditor = e => {
    this.content = e
    // this.props.ui.answer.content = e
  }
  _createQuestion = async e => {
    const { anonymous, content } = this
    if (checkEmpty(content)) {
      notify({
        style: 'bar',
        position: 'top-right',
        message: 'Empty content',
        type: 'warning',
        showClose: false,
        timeout: 4000
      })
    } else {
      try {
        const { question } = this.props
        const res = await this.props.AnswerStore.createAnswer({
          title: 'default',
          content,
          communityId: question.community.id,
          questionId: question.id
        })
        this.pending = false
        this.content = ''
      } catch (err) {
        // TODO implement error notify
        console.log(err)
        notify({
          style: 'bar',
          position: 'top-right',
          message: 'Error answering question.',
          type: 'danger',
          showClose: false,
          timeout: 4000
        })
      }
    }
  }
}

const SummernoteWrapper = styled.div`
  .ql-editor {
    min-height: 300px;
  }
  .ql-tooltip {
    z-index: 1000;
  }
`

// const appWithApollo = compose(graphql(createAnswer, { name: 'createAnswer' }))(
//   CreateAnswerPage
// )

export default CreateAnswerPage
