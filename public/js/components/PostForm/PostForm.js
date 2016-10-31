import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cx from 'classnames'
import * as PostActions from '../../actions/post'

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = { bolder: false }
    this.bolder = this.bolder.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  bolder(e) {
    const title = e.target.value.length
    title > 0 ? this.setState({ bolder: true }) : this.setState({ bolder: false })
  }
  handleSubmit(e) {
    e.preventDefault()
    const title = e.target.post_title.value.trim()
    const content = e.target.post_content.value.trim()
    this.props.post.createPostRequest({ title, content })
  }
  render() {
    const { filter, expandPostForm, shrinkPostForm } = this.props
    const { bolder } = this.state
    const placeHolder = filter ? 'TITLE' : 'Do you want to share something?'

    return (
      <form className={cx('post-form', { expand: filter })} onSubmit={this.handleSubmit}>
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
 				<button className='post-btn' role='submit'>POST</button>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    post: bindActionCreators(PostActions, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(PostForm)
