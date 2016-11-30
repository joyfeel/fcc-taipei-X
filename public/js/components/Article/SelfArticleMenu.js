import React, { Component, PropTypes } from 'react'
import cx from 'classnames'

class SelfArticleMenu extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { show } = this.props
    return (
      <div className={cx('article-menu', { show })}>
        <i className='post-2'>Edit</i>
        <i className='cancel-3'>Delete</i>
      </div>
    )
  }
}

SelfArticleMenu.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default SelfArticleMenu
