import React, { Component, PropTypes } from 'react'
import cx from 'classnames'

class OtherArticleMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookmark: false,
    }
    this.addToBookmark = this.addToBookmark.bind(this)
  }
  addToBookmark() {
    this.setState({
      bookmark: !this.state.bookmark,
    })
  }
  render() {
    const { show } = this.props
    const favorite = this.state.bookmark ? 'bookmark-2' : 'bookmark-1'
    return (
      <div className={cx('article-menu', { show })}>
        <i className={cx(favorite)} onClick={this.addToBookmark}>Bookmark</i>
        <i className='report-1'>Report</i>
      </div>
    )
  }
}

OtherArticleMenu.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default OtherArticleMenu
