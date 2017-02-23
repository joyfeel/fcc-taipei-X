import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class CommentForm extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <form className='comment-form'>
        <textarea name='comment_input' className='comment-input' cols='30' rows='10' placeholder='Join the discussion'></textarea>
        <button className='comment-btn' role='submit'>POST</button>
      </form>
    )
  }
}

export default CommentForm
