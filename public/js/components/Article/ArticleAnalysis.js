import React, { Component, PropTypes } from 'react'


const ArticleAnalysis = ({ post }) =>
  <div className='article-analysis'>
    <i className='comment-o-2'>{post.comments.length}</i>
    <i className='thumb-down-1'>{post.dislike_count}</i>
    <i className='thumb-up-1 active'>{post.like_count}</i>
  </div>

ArticleAnalysis.propTypes = {
  post: PropTypes.object.isRequired,
}

export default ArticleAnalysis
