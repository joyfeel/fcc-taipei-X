import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import SelfArticleMenu from './SelfArticleMenu'
import OtherArticleMenu from './OtherArticleMenu'


class ArticleMenu extends Component {
  constructor(props) {
    super(props)
    this.renderArticleMenu = this.renderArticleMenu.bind(this)
  }

  renderArticleMenu(show, postId, authId) {
    if(postId === authId) {
      return <SelfArticleMenu show={show} />
    } else {
      return <OtherArticleMenu show={show} />
    }
  }
  render() {
    const { show, postId, authId } = this.props
    return this.renderArticleMenu(show, postId, authId)
    }
}

ArticleMenu.propTypes = {
  show: PropTypes.bool.isRequired,
  postId: PropTypes.string.isRequired,
  authId: PropTypes.string.isRequired,
}

export default ArticleMenu
