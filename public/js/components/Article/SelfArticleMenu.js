import React, { Component, PropTypes } from 'react'
import cx from 'classnames'

const SelfArticleMenu = ({ show }) =>
  <div className={cx('article-menu', { show: show })}>
    <i className='post-2'>Edit</i>
    <i className='cancel-3'>Delete</i>
  </div>


SelfArticleMenu.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default SelfArticleMenu
