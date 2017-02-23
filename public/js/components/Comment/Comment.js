import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as CommentActions from '../../actions/comment'
import cx from 'classnames'
import CommentForm from './CommentForm'
import LoadingComment from './LoadingComment'
import CommentList from './CommentList'

class Comment extends Component {
  constructor(props) {
    super(props)
    this.renderComments = this.renderComments.bind(this)
  }
  renderComments(commentsId, comments) {
    return commentsId.map(id => {
      return comments.map(c => {
        if (c._id === id) {
          return <CommentList key={id} comment={c} />
        }
      })
    })
  }
  render() {
    const { fold, commentFetching, commentsId, comments, toggleCommentForm } = this.props
    return (
      <div className={cx('comment', { 'fold': fold, 'loading-comment': commentFetching})}>
        {this.renderComments(commentsId, comments)}
        <i className='arrow-down-3' onClick={toggleCommentForm} id='arrow-down'></i>
        <LoadingComment />
        <CommentForm />
      </div>
    )
  }
}

Comment.propTypes = {
  fold: PropTypes.bool.isRequired,
  commentsId: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  toggleCommentForm: PropTypes.func.isRequired,
  commentFetching: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
  return {
    comments: state.comment
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    comment: bindActionCreators(CommentActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
