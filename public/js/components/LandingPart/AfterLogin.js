import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import * as PostActions from '../../actions/post'

class AfterLogin extends Component {
  constructor(props) {
    super(props)
    this.handleSendPost = this.handleSendPost.bind(this)
  }
  handleSendPost(e) {
    e.preventDefault()
    const post = {
      author: this.props.id,
      subject: 'Today is a good day',
      content: 'How is that word say?',
    }
    this.props.post.createPostRequest(post)
  }
  render() {
    return (
      <div>
        <h1>You have already logged</h1>
        <Link to='/about'>about</Link>
        <div onClick={this.handleSendPost}>Send the post</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.auth.profile.id
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    post: bindActionCreators(PostActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AfterLogin)
