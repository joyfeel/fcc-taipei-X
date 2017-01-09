import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cx from 'classnames'
import PostTitle from './PostTitle'
import PostContent from './PostContent'
import * as PostActions from '../../actions/post'
import * as CombineActions from '../../actions/combine'
import * as PopupActions from '../../actions/popup'
import { popupMethodToCode } from '../../utils/apicode'

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: null,
      counting: false,
      bolder: false,
      disabled: true,
      post_title: '',
      post_content: '',
    }
    /* Post form related function */
    this.closePostForm = this.closePostForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.detectPostForm = this.detectPostForm.bind(this)
    /* Time related function */
    this.tick = this.tick.bind(this)
    /*set edit states from store to react states*/
    this.setEditValue = this.setEditValue.bind(this)
    this.detectEditPostRequest = this.detectEditPostRequest.bind(this)

    /*reset all states to init*/
    this.resetStates = this.resetStates.bind(this)
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
  setEditValue(title, content) {
    this.setState({
      bolder: true,
      disabled: false,
      post_title: title,
      post_content: content,
    })
  }
  resetStates() {
    this.setState({
      bolder: false,
      disabled: true,
      post_title: '',
      post_content: '',
    })
  }
  //點擊發文區塊時觸發
  detectPostForm(e) {
    const { isPostformOpen, editPost } = this.props
    const bolder = (this.refs['titleValue'].refs['inp'].value.trim().length > 0) ? true : false
    const disabled = (this.state.post_title.length > 0 && this.state.post_content.length > 0) ? false : true

    this.setState({
      bolder,
      disabled,
      [e.target.name]: e.target.value,
    })

    !isPostformOpen && this.props.combine.postformOpen()
  }
  //點擊 close 時觸發
  closePostForm(e) {
    const { editPost } = this.props
    const { post_title, post_content } = this.state
    /*
      當關閉 post form 時，先做 edit 部分的邏輯驗證
      若 form 上的 title 與 content 跟原先的內容一樣，就可以直接退出關閉
    */
    if (editPost && (editPost.title === post_title && editPost.content === post_content)) {
      this.resetStates()
      return this.props.combine.editformClose()
    }

    /*
      再來接著做 post form 部分的邏輯驗證
      若 form 上的 title 與 content 的內容不存在，就可以直接退出關閉
    */
    const hasText = post_title.length > 0 || post_content.length > 0 ? true : false
    if (!hasText) {
      return this.props.combine.postformClose()
    }

    const code = popupMethodToCode[e.target.className]
    this.props.popup.popupRequest({ code })
  }
  detectEditPostRequest(title, content, editPost) {
    const { id } = editPost

    if( editPost.title !== title || editPost.content !== content) {
      this.props.post.editPostRequest({ title, content, id })
    }

    this.props.combine.editformClose()
  }
  handleSubmit(e) {
    e.preventDefault()
    const title = e.target.post_title.value.trim()
    const content = e.target.post_content.value.trim()
    const { editPost } = this.props

    if(editPost) {
      this.detectEditPostRequest(title, content, editPost)
    } else {
      this.props.post.createPostRequest({ title, content })
      this.props.combine.postformClose()
    }
    e.target.reset()
    this.resetStates()
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

    //for editPost
    const { post_title } = this.state
    if(nextProps.editPost !== null && post_title.length === 0) {
      const {title, content } = nextProps.editPost
      this.setEditValue(title, content)
    }

    // Horrible logic, need to be refactored
    if (this.props.isPostformOpen === true && nextProps.isPostformOpen === false) {
      this.resetStates()
    }
  }
  render() {
    const { isPostformOpen, isFetching, isPopup, editPost } = this.props
    const { count, counting, bolder, disabled, post_title, post_content } = this.state
    const placeHolder = isPostformOpen ? 'TITLE (required)' : 'Do you want to share something?'

    return (
      <form className={cx('post-form', { expand: isPostformOpen, hidden: isFetching || isPopup })} onSubmit={this.handleSubmit}>
 	    	<i className='close' onClick={this.closePostForm}>close</i>
        { counting && editPost === null ?
          <div className='post-btn'>{this.timeFormat(count)}</div> :
          <button className='post-btn' role='submit' disabled={disabled}>POST</button>
        }
 				<label className='post-1' htmlFor='post-title-input'></label>
        <PostTitle
          placeHolder={placeHolder}
          detectPostForm={this.detectPostForm}
          bolder={bolder}
          value={post_title}
          ref='titleValue'
        />
        <PostContent
          detectPostForm={this.detectPostForm}
          value={post_content}
        />
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
  isPostformOpen: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
  const { create_post_time, id } = state.auth.profile
  const { editPost } = state.combine
  const { isPopup } = state.popup
  return {
    id,                 // 已登入的使用者本人ID
    create_post_time,   // 已登入的使用者本人發文時間
    isPopup,
    editPost,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    post: bindActionCreators(PostActions, dispatch),
    combine: bindActionCreators(CombineActions, dispatch),
    popup: bindActionCreators(PopupActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
