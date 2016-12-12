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
    const { posts, findOlderFetching } = this.props
    return (
      <div>
        <Article
          posts={posts}
          findOlderFetching={findOlderFetching}
        />
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
  const { findOlderFetching } = state.combine

  return {
    posts: state.posts,
    findOlderFetching,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    post: bindActionCreators(PostActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AfterLogin)
