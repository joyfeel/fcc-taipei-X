import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cx from 'classnames'
import Header from './Header'
import Loading from '../components/Shared/Loading'
import Popup from '../components/Shared/Popup'
import PostForm from '../components/PostForm/PostForm'
import * as AuthActions from '../actions/auth'
import * as PostActions from '../actions/post'
// import countdown from '../utils/time'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: false,
      postForm: {
        post_title: false,
        post_content: false,
        bolder: false,
        submit: true,
      }
    }
    this.detectPostForm = this.detectPostForm.bind(this)
    this.shrinkPostForm = this.shrinkPostForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  postForm(title, e, postForm) {
    const txt = e.target.value.trim()
    const len = txt.length
    const { post_title, post_content, placeHolder } = this.state.postForm
    const { filter } = this.state
    this.setState({
      postForm: {
        ...postForm,
        bolder: title > 0 ? true : false,
        submit: (post_title && post_content) ? false : true,
        [e.target.name]: len > 0 ? true : false,
      }
    })
  }
  detectPostForm(e) {
    const { postForm } = this.state

    switch (e.target.name) {
      case 'post_title':
        const title1 = e.target.value.length
        this.postForm(title1, e, postForm)
      break;
      case 'post_content':
        const title2 = e.target.previousSibling.value.length
        this.postForm(title2, e, postForm)
      break;
    }// title1, title2 for detecting post-title-input bolder effect
    this.setState({ filter: true })
  }
  shrinkPostForm() {
    this.setState({ filter: false })
  }

  handleSubmit(e) {
    e.preventDefault()
      this.setState({ filter: false })
      const title = e.target.post_title.value.trim()
      const content = e.target.post_content.value.trim()
      this.props.post.createPostRequest({ title, content })
      e.target.post_title.value = ''
      e.target.post_content.value = ''
  }


  render() {
    const { globalFetching, isPopup, clearPopupMsg, popupMsg, profile } = this.props
    const { filter, postForm } = this.state
    const wrapperClasses = cx({
      'wrapper': true,
      'mask': globalFetching || isPopup || filter,
      'login': profile.token,
    })

    return (
      <div>
        <Header filter={filter} />
        <div className={wrapperClasses}>
          {this.props.children}
        </div>
        {globalFetching ? <Loading /> : null }
        {isPopup ? <Popup popupMsg={popupMsg} isPopup={isPopup} /> : null }
        {profile.token ?
          <PostForm
            filter={filter}
            detectPostForm={this.detectPostForm}
            shrinkPostForm={this.shrinkPostForm}
            postForm={postForm}
            handleSubmit={this.handleSubmit}
          />
        : null}
      </div>
    )
  }

  componentDidMount() {
    this.props.auth.refreshTokenRequest()
  }
}

const mapStateToProps = (state) => {
  const { isPopup, popupMsg, profile } = state.auth
  const { newPost } = state.post
  return {
    globalFetching: state.auth.isFetching || state.post.isFetching,
    isPopup,
    popupMsg,
    profile,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    auth: bindActionCreators(AuthActions, dispatch),
    post: bindActionCreators(PostActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
