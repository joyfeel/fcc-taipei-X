import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cx from 'classnames'


class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = { bolder: false }
    this.bolder = this.bolder.bind(this)
  }

  bolder(e) {
    const title = e.target.value.length

    title > 0 ?
      this.setState({ bolder: true }) : this.setState({ bolder: false })

  }

  render() {
    const { filter, expandPostForm, shrinkPostForm } = this.props
    const { bolder } = this.state
    const placeHolder = filter ? 'TITLE' : 'Do you want to share something?'

    return (
      <form action='' className={cx('post-form', { expand: filter })}>
 	    	<i className='cancel-3' onClick={shrinkPostForm}></i>
 				<label className='post-1' htmlFor='post-title-input'></label>
 				<input
          type='text'
          placeholder={placeHolder}
          className={cx('post-title-input', { bolder: bolder })}
          id='post-title-input'
          name='post_title'
          onFocus={expandPostForm}
          onKeyDown={this.bolder}
          onBlur={this.bolder}
          onKeyUp={this.bolder}
        />
 				<textarea className='post-content-input' name='post_content' id='' cols='30' rows='10' placeholder='write down what do you think'></textarea>
 				<button className='post-btn' role='submit' type='submit'>POST</button>
      </form>
  )}
}

export default PostForm
