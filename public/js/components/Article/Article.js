import React, { Component, PropTypes } from 'react'

const StatelessArticle = ({ post }) => {
  return (
    <article className='article'>
      <a href='' className='article-avatar'>
        <img src={post.author.avatar} className='member-avatar' alt='member-avatar' />
      </a>
      <a href='' className='article-author'>{post.author.nickname}</a>
      <span className='article-time'>2hrs ago</span>
      <i className='more-2'></i>
      <h3 className='article-title'>{post.title}</h3>
      <p className='article-content'>{post.content}</p>
      <div className='article-analysis'>
        <i className='comment-o-2'>{post.comments.length}</i>
        <i className='thumb-down-1'>{post.dislike_count}</i>
        <i className='thumb-up-1 active'>{post.like_count}</i>
      </div>
    </article>
  )
}

class Article extends Component {
  constructor(props) {
    super(props)
  }
  renderArticles(posts) {
    return posts.map(post => {
      return <StatelessArticle key={post.id} post={post} />
    })
  }
  render() {
    const { posts } = this.props
    return (
      <main className='main' role='main'>
        {this.renderArticles(posts)}
      </main>
    )
  }
}

export default Article
