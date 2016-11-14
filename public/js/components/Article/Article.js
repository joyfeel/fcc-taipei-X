import React, { Component, PropTypes } from 'react'

const StatelessArticle = ({ post }) => {
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
{/* <<<<<<< HEAD */}
        {this.renderArticles(posts)}
{/* =======
        <article className='article'>
          <a href='' className='article-avatar'>
            <img src='http://goo.gl/e23Dk8' className='member-avatar' alt='member-avatar' />
          </a>
          <a href='' className='article-author'>PIKO SUN</a>
          <span className='article-time'>2hrs ago</span>
          <i className='more-2'></i>
          <h3 className='article-title'>PPAP</h3>
          <p className='article-content'>I have a pen, I have an apple. Ah! Apple pen. I have a pen. I have a pineapple. Ah! Pineapple pen. Apple pen. Pineapple pen. Ah! Pen pineapple apple pen. Pen pineapple apple pen.</p>
          <div className='article-analysis'>
            <i className='comment-o-2'>0</i>
            <i className='thumb-down-1'>87</i>
            <i className='thumb-up-1 active'>1</i>
          </div>
          <div className='article-menu'>
            <i className='post-2'>Edit</i>
            <i className='cancel-3'>Delete</i>
            <i className='bookmark-1'>Bookmark</i>
          </div>
        </article>
>>>>>>> for_merge */}
      </main>
    )
  }
}

export default Article
