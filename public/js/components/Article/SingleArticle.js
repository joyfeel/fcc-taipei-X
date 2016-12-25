import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ArticleAnalysis from './ArticleAnalysis'
import { formatDate } from '../../utils/time/time'
import SelfArticleMenu from './SelfArticleMenu'
import OtherArticleMenu from './OtherArticleMenu'

class SingleArticle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
    }
    this.toggleArticleMenu = this.toggleArticleMenu.bind(this)
    this.closeArticleMenu = this.closeArticleMenu.bind(this)
    this.detectArticleMenu = this.detectArticleMenu.bind(this)
    this.displayDate = this.displayDate.bind(this)
  }
  toggleArticleMenu() {
    this.setState({
      show: !this.state.show,
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

  render() {
    const { post, authId } = this.props
    const { id, title, content } = this.props.post
    const { show } = this.state
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
        <ArticleAnalysis post={post} />
        {this.renderArticleMenu(show, post.author.id, authId, id, title, content)}
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

const mapStateToProps = (state) => {
  const { id } = state.auth.profile
  return {
    authId: id,
  }
}

SingleArticle.propTypes = {
  post: PropTypes.object.isRequired,
  authId: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, null)(SingleArticle)
