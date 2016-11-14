import React, { Component, PropTypes } from 'react'
import cx from 'classnames'

class PostForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { filter, detectPostForm, shrinkPostForm, handleSubmit } = this.props
    const { bolder, submit } = this.props.postForm
    const placeHolder = filter ? 'TITLE (required)' : 'Do you want to share something?'

    return (
      <form className={cx('post-form', { expand: filter })} onSubmit={handleSubmit}>
 	    	<i className='close' onClick={shrinkPostForm}>close</i>
        <button className='post-btn' role='submit' disabled={submit}>POST</button>
 				<label className='post-1' htmlFor='post-title-input'></label>
 				<input
          type='text'
          placeholder={placeHolder}
          className={cx('post-title-input', { bolder: bolder })}
          id='post-title-input'
          name='post_title'
          onFocus={detectPostForm}
          onKeyDown={detectPostForm}
          onBlur={detectPostForm}
          onKeyUp={detectPostForm}
          onChange={detectPostForm}
        />
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
      </form>
    )
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     post: bindActionCreators(PostActions, dispatch),
//   }
// }

// export default connect(null, mapDispatchToProps)(PostForm)

export default PostForm
