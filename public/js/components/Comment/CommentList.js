import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { formatDate } from '../../utils/time/time'
import cx from 'classnames'

class CommentList extends Component {
  constructor(props) {
    super(props)
    this.displayDate = this.displayDate.bind(this)
  }
  displayDate(isoDate) {
    return formatDate(isoDate)
  }
  render() {
    const c = this.props.comment

    return (
      <div className="comment-list">
        <a href='' className='comment-avatar'>
          <img src={c.author.avatar} className='member-avatar' alt='comment-avatar' />
        </a>
        <a href='' className='comment-author'>{c.author.nickname}</a>
        <span className="comment-time">{this.displayDate(c.createdAt)}</span>
        <p className='comment-content'>
          {c.content}
        </p>
        <i className='more-2'></i>
        <div className="comment-menu">
          <i className="post-2">Edit</i>
          <i className="cancel-3">Delete</i>
        </div>
      </div>
  )}
}

Comment.propTypes = {
  comment: PropTypes.object,
}

export default CommentList
