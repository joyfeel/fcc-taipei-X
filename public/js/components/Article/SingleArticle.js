import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ArticleAnalysis from './ArticleAnalysis'
import { formatDate } from '../../utils/time/time'
import SelfArticleMenu from './SelfArticleMenu'
import OtherArticleMenu from './OtherArticleMenu'
import Comment from '../Comment/Comment'
import * as CommentActions from '../../actions/comment'

class SingleArticle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      commentToggle: false,
      fold: false,
      commentsIdLength: 0,
      commentFetching: false,
    }
    this.toggleArticleMenu = this.toggleArticleMenu.bind(this)
    this.closeArticleMenu = this.closeArticleMenu.bind(this)
    this.detectArticleMenu = this.detectArticleMenu.bind(this)
    this.displayDate = this.displayDate.bind(this)
    this.toggleCommentForm = this.toggleCommentForm.bind(this)
    this.commentFormStateChange = this.commentFormStateChange.bind(this)
  }
  toggleArticleMenu() {
    this.setState({
      show: !this.state.show,
    })
  }
  commentFormStateChange(realCommentCount, commentLength) {
    const { commentsIdLength } = this.state
    this.setState({
      fold: (realCommentCount > commentLength) ? true : false,
      commentsIdLength: commentLength,
      commentFetching: false,
    })
  }
  toggleCommentForm(e) {
    const { id, comments, realCommentCount } = this.props.post
    const { commentsIdLength, commentFetching } = this.state

    // 打開留言區
    if(e.target.id === 'comment-toggle') {
      this.setState({
        commentToggle: !this.state.commentToggle,
      })
      /*
        已打開過部分留言，但不是要再找新留言
        當 store.post.comments 裡 comment id 等於 react ui state 且 DOM 已有留言
        commentsIdLength > 0
      */
      if(comments.length === commentsIdLength && commentsIdLength > 0)
        return
    }
    /* 如果上一次的request還沒response ，return 掉，不讓再發request */
    if(e.target.id === 'arrow-down') if(commentFetching) return

    /*無留言數，不用 dispatch action，以及 laoding 訊息*/
    if(realCommentCount === 0) return
    this.props.comment.getCommentRequest({ id, comments })
    this.setState({
      commentFetching: true,
    })
  }
  closeArticleMenu() {
    this.setState({
      show: false,
    })
  }
  detectArticleMenu(e) {
    const more = this.refs['more']
    const articleMenu = this.refs['articleMenu']
    if(e.target !== more && !ReactDOM.findDOMNode(articleMenu).contains(e.target)) {
      this.closeArticleMenu()
    }
  }
  displayDate(isoDate) {
    return formatDate(isoDate)
  }
  renderArticleMenu(show, postAuthorId, authId, id, title, content) {
    if (postAuthorId === authId) {
      return <SelfArticleMenu show={show} id={id} title={title} content={content} ref='articleMenu' />
    }
    return <OtherArticleMenu show={show} ref='articleMenu' />
  }
  componentWillReceiveProps(nextProps) {
    const { realCommentCount , comments } = nextProps.post
    const { commentsIdLength } = this.state
    /*
       當 store.post.comments 留言 id 增加後，與 react ui state commentsIdLength 留言數 比對
       改變停止 loading 狀態並更新 react ui 留言數 及 留言數 與 store.post.comments 留言 比對 顯示 更多留言 fold 存在必要
    */
    if(comments.length > commentsIdLength) {
      return this.commentFormStateChange(realCommentCount, comments.length)
    }
  }

  render() {
    const { post, authId } = this.props
    const { id, title, content, comments } = this.props.post
    const { show, commentToggle, fold, commentFetching } = this.state
    return (
      <article className='article'>
        <a href='' className='article-avatar'>
          <img src={post.author.avatar} className='member-avatar' alt='member-avatar' />
        </a>
        <a href='' className='article-author'>{post.author.nickname}</a>
        <span className='article-time'>{this.displayDate(post.created_time)}</span>
        <i className='more-2' onClick={this.toggleArticleMenu} ref='more'></i>
        <h3 className='article-title'>{post.title}</h3>
        <p className='article-content'>{post.content}</p>
        <ArticleAnalysis post={post} commentToggle={commentToggle} toggleCommentForm={this.toggleCommentForm} />
        {this.renderArticleMenu(show, post.author.id, authId, id, title, content)}
        <Comment fold={fold} commentFetching={commentFetching} commentsId={comments} toggleCommentForm={this.toggleCommentForm} />
      </article>
    )
  }
  componentDidMount() {
    document.addEventListener('click', this.detectArticleMenu, false)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.detectArticleMenu, false)
  }
}

SingleArticle.propTypes = {
  post: PropTypes.object.isRequired,
  // commentFetching: PropTypes.bool.isRequired,
  authId: PropTypes.string.isRequired,
  postIndex: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => {
  const { id } = state.auth.profile
  // const { commentFetching } = state.combine
  return {
    authId: id,
    // commentFetching: commentFetching,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    comment: bindActionCreators(CommentActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle)
