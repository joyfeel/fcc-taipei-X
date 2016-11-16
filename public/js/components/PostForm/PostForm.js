import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import PostTitle from './PostTitle'
import PostContent from './PostContent'


class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      btn: null,
      counting: false,
    }
    this.timeCalc = this.timeCalc.bind(this)
    this.timeFormat = this.timeFormat.bind(this)
    this.tick = this.tick.bind(this)
  }
  timeCalc(date) {
    const limited = Date.parse(date)
    const now = Date.now()

    if(limited > now) {
      const sec = Math.floor( (limited - now)/1000 )
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
  tick() {
    if(this.state.btn <= 0) {
      clearInterval(this.interval)
      this.setState({ btn: null, counting: false })
    } else {
      this.setState({ btn: this.state.btn - 1 })
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.newPost) {
      const { counting } = this.state
      const { create_post_time } = nextProps.newPost.author

      if(!counting) this.timeCalc(create_post_time)
    }
  }

  render() {
    const { filter, detectPostForm, shrinkPostForm, handleSubmit } = this.props
    const { bolder, submit } = this.props.postForm
    const { btn, counting } = this.state
    const placeHolder = filter ? 'TITLE (required)' : 'Do you want to share something?'

    return (
      <form className={cx('post-form', { expand: filter })} onSubmit={handleSubmit}>
 	    	<i className='close' onClick={shrinkPostForm}>close</i>
        { counting ?
          <div className='post-btn'>{this.timeFormat(btn)}</div> :
          <button className='post-btn' role='submit' disabled={submit}>POST</button>
        }
 				<label className='post-1' htmlFor='post-title-input'></label>
        <PostTitle placeHolder={placeHolder} detectPostForm={detectPostForm} bolder={bolder} />
        <PostContent detectPostForm={detectPostForm} />
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
  detectPostForm: PropTypes.func.isRequired,
  shrinkPostForm: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  postForm: PropTypes.object.isRequired,
  filter: PropTypes.bool.isRequired,
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

export default connect(mapStateToProps, null)(PostForm)
