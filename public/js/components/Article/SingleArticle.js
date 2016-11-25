import React, { Component, PropTypes } from 'react'


const SingleArticle = ({ post }) => {
  return (
    <article className='article'>
      <a href='' className='article-avatar'>
        <img src={post.author.avatar} className='member-avatar' alt='member-avatar' />
      </a>
      <a href='' className='article-author'>{post.author.nickname}</a>
      <span className='article-time'>{post.created_time}</span>
      <i className='more-2'></i>
      <h3 className='article-title'>{post.title}</h3>
      <p className='article-content'>{post.content}</p>
      <div className='article-analysis'>
        <i className='comment-o-2'>{post.comments.length}</i>
        <i className='thumb-down-1'>{post.dislike_count}</i>
        <i className='thumb-up-1 active'>{post.like_count}</i>
      </div>
      <div className='article-menu'>
        <i className='post-2'>Edit</i>
        <i className='cancel-3'>Delete</i>
        <i className='bookmark-1'>Bookmark</i>
      </div>
    </article>
  )
}

export default SingleArticle
