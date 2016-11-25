import React, { Component, PropTypes } from 'react'
import cx from 'classnames'

const FindNewer = ({ getNewPost, newPostCount }) => {
  const flag = newPostCount > 0 ? true : false
  const txt = newPostCount > 1 ? 'posts' : 'post'

  return (
    <a href=''
      className={cx('find-newer', { get: flag })}
      onClick={getNewPost}>
      View {newPostCount} new {txt}
    </a>
  )
}

FindNewer.propTypes = {
  getNewPost: PropTypes.func.isRequired,
  newPostCount: PropTypes.number.isRequired,
}

export default FindNewer
