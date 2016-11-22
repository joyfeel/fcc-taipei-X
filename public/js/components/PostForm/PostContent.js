import React, { Component, PropTypes } from 'react'

const PostContent = ({ detectPostForm }) =>
  <textarea
    className='post-content-input'
    name='post_content' id='post_content'
    cols='30' rows='10'
    placeholder='write down what do you think :)'
    onFocus={detectPostForm}
    onKeyDown={detectPostForm}
    onBlur={detectPostForm}
    onKeyUp={detectPostForm}
    onChange={detectPostForm}>
  </textarea>

  PostContent.propTypes = {
    detectPostForm: PropTypes.func.isRequired,
  }


export default PostContent
