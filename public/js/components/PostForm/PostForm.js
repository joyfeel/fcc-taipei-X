import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cx from 'classnames'
import PostTitle from './PostTitle'
import PostContent from './PostContent'
import * as PostActions from '../../actions/post'

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      btn: null,
      counting: false,
      post_title: false,
      post_content: false,
      bolder: false,
      submit: true,
    }
    /* Post form related function */
    this.shrinkPostForm = this.shrinkPostForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onTextChange = this.onTextChange.bind(this)
    /* Time related function */
    this.tick = this.tick.bind(this)
  }
  tick() {
    if(this.state.btn <= 0) {
      clearInterval(this.interval)
      this.setState({ btn: null, counting: false })
    } else {
      this.setState({ btn: this.state.btn - 1 })
    }
  }
  timeCalc(date) {
    const limited = Date.parse(date)
    const now = Date.now()

    if(limited > now) {
      const sec = Math.floor( (limited - now) / 1000 )
      this.setState({ btn: sec, counting: true })
      this.interval = setInterval(this.tick, 1000)
    }
  }
  timeFormat(sec) {
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)

    if( s < 10 )
      return `0${m}:0${s}`
    else
      return `0${m}:${s}`
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.newPost) {
      const { counting } = this.state
      const { create_post_time } = nextProps.newPost.author

      if(!counting) this.timeCalc(create_post_time)
    }
  }
  onTextChange(e) {
    const submit = (this.state.post_title && this.state.post_content) ? false : true
    const hasText = e.target.value.trim().length > 0 ? true : false
    this.setState({
      submit,
      [e.target.name]: hasText,
      bolder: hasText,
    })
    this.props.setFilter(true)
  }
  shrinkPostForm() {
    this.props.setFilter(false)
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.setFilter(false)
    const title = e.target.post_title.value.trim()
    const content = e.target.post_content.value.trim()
    this.props.post.createPostRequest({ title, content })
    e.target.reset()
  }
  render() {
    const { filter } = this.props
    const { btn, counting, postForm, bolder, submit } = this.state
    const placeHolder = filter ? 'TITLE (required)' : 'Do you want to share something?'

    return (
      <form className={cx('post-form', { expand: filter })} onSubmit={this.handleSubmit}>
 	    	<i className='close' onClick={this.shrinkPostForm}>close</i>
        {counting ?
          <div className='post-btn'>{this.timeFormat(btn)}</div> :
          <button className='post-btn' role='submit' disabled={submit}>POST</button>}
 				<label className='post-1' htmlFor='post-title-input'></label>
        <PostTitle
          placeHolder={placeHolder}
          detectPostForm={this.onTextChange}
          bolder={bolder}
        />
        <PostContent detectPostForm={this.onTextChange} />
      </form>
    )
  }
  componentDidMount() {
    const { create_post_time } = this.props
    this.timeCalc(create_post_time)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
}

PostForm.propTypes = {
  filter: PropTypes.bool.isRequired,
  setFilter: PropTypes.func.isRequired,
  newPost: PropTypes.object,
  create_post_time: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  const { newPost } = state.post
  const { create_post_time } = state.auth.profile
  return {
    newPost,
    create_post_time,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    post: bindActionCreators(PostActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
