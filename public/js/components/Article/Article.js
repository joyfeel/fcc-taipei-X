import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import cx from 'classnames'

class Article extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <main className='main' role='main'>
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
        </article>
      </main>
    )
  }
}

export default Article
