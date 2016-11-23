import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Article from '../components/Article/Article'
import * as PostActions from '../actions/post'
import { scrollBottomListener } from '../utils/mixed'

class AfterLogin extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { postList } = this.props
    return (
      <div>
        <Article posts={postList} />
      </div>
    )
  }
  componentDidMount() {
    window.addEventListener('scroll', scrollBottomListener.bind(null, this.props.post.findOlderPostRequest), false)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', scrollBottomListener, false)
  }
}

const mapStateToProps = (state) => {
  const { postList } = state.post
  return {
    postList,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    post: bindActionCreators(PostActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AfterLogin)
