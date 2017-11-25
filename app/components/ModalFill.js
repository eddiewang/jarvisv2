import React, { Component } from 'react'
import styled from 'styled-components'

class ModalFill extends Component {
  render () {
    return (
      <ModalWrapper
        className='modal fade fill-in'
        id='modalFillIn'
        tabindex='-1'
        role='dialog'
        aria-labelledby='modalFillInLabel'
        aria-hidden='true'
      >
        <button
          type='button'
          className='close'
          data-dismiss='modal'
          aria-hidden='true'
        >
          <i className='pg-close' />
        </button>
        <div className='modal-dialog '>
          <div className='modal-content'>
            {this.props.children}
            <div className='modal-footer' />
          </div>
        </div>
      </ModalWrapper>
    )
  }
}

const ModalWrapper = styled.div`
  background-color: rgba(255, 255, 255, 1) !important;
`

export default ModalFill
