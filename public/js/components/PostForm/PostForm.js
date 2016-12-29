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
      count: null,
      counting: false,
      post_title: false,
      post_content: false,
      bolder: false,
      disabled: true,
    }
    /* Post form related function */
    this.shrinkPostForm = this.shrinkPostForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.detectPostForm = this.detectPostForm.bind(this)
    /* Time related function */
    this.tick = this.tick.bind(this)
  }
  timeCalc(date) {
    const limited = Date.parse(date)
    const now = Date.now()

    if(limited > now) {
      const sec = Math.floor((limited - now) / 1000)
      this.setState({ count: sec, counting: true })
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
  tick() {
    if(this.state.count <= 0) {
      clearInterval(this.interval)
      this.setState({ count: null, counting: false })
    } else {
      this.setState({ count: this.state.count - 1 })
    }
  }
  detectPostForm(e) {
    const bolder = (this.refs['titleValue'].refs['inp'].value.trim().length > 0) ? true : false
    const hasText = e.target.value.trim().length > 0 ? true : false
    const disabled = (this.state.post_title && this.state.post_content) ? false : true

    this.setState({
      bolder,
      disabled,
      [e.target.name]: hasText,
    })

    this.props.setFilter(true)
  }
  shrinkPostForm() {
    this.props.setFilter(false)
  }
  handleSubmit(e) {
    e.preventDefault()
    const title = e.target.post_title.value.trim()
    const content = e.target.post_content.value.trim()
    this.props.post.createPostRequest({ title, content })
    e.target.reset()
    this.setState({
      post_title: false,
      post_content: false,
      bolder: false,
    })

    this.props.setFilter(false)
  }
  componentWillReceiveProps(nextProps) {
    /*
      The property `create_post_time` is pushing from server side of socket.io
      Therefore, we need to compare the property between old and new
    */
    const { counting } = this.state
    if (this.props.create_post_time !== nextProps.create_post_time && !counting) {
      this.timeCalc(nextProps.create_post_time)
    }
  }
  render() {
    const { filter, isFetching, isPopup } = this.props
    const { count, counting, bolder, disabled } = this.state
    const placeHolder = filter ? 'TITLE (required)' : 'Do you want to share something?'

    return (
      <form className={cx('post-form', { expand: filter, hidden: isFetching || isPopup })} onSubmit={this.handleSubmit}>
 	    	<i className='close' onClick={this.shrinkPostForm}>close</i>
        { counting ?
          <div className='post-btn'>{this.timeFormat(count)}</div> :
          <button className='post-btn' role='submit' disabled={disabled}>POST</button>
        }
 				<label className='post-1' htmlFor='post-title-input'></label>
        <PostTitle
          placeHolder={placeHolder}
          detectPostForm={this.detectPostForm}
          bolder={bolder}
          ref='titleValue'
        />
        <PostContent detectPostForm={this.detectPostForm} />
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
  isFetching: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
  const { create_post_time, id } = state.auth.profile
  const { isPopup } = state.popup
  return {
    id,                 // 已登入的使用者本人ID
    create_post_time,   // 已登入的使用者本人發文時間
    isPopup,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    post: bindActionCreators(PostActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
