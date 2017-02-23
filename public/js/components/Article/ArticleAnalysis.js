import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cx from 'classnames'

class ArticleAnalysis extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    const { realCommentCount, dislike_count, like_count } = this.props.post
    const { commentToggle, toggleCommentForm } = this.props
    return (
      <div className={cx('article-analysis', {'comment-toggle': commentToggle })} id='comment-toggle' onClick={toggleCommentForm}>
        <i className='comment-o-2'>{realCommentCount}</i>
        <i className='thumb-down-1'>{dislike_count}</i>
        <i className='thumb-up-1 active'>{like_count}</i>
      </div>
  )}
}


ArticleAnalysis.propTypes = {
  post: PropTypes.object.isRequired,
  commentToggle: PropTypes.bool,
  toggleCommentForm: PropTypes.func.isRequired,
}

export default ArticleAnalysis
