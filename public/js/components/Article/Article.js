import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as PostActions from '../../actions/post'
import FindNewer from './FindNewer'
import FindOlder from './FindOlder'
import SingleArticle from './SingleArticle'
import Config from '../../utils/config'

class Article extends Component {
  constructor(props) {
    super(props)
    this.childGetNewPost = this.childGetNewPost.bind(this)
    this.detectNewPost = this.detectNewPost.bind(this)
  }
  renderArticles(posts) {
    return posts.map( (post, idx) => {
      return <SingleArticle key={post.id} post={post} postIndex={idx} />
    })
  }
  detectNewPost() {
    this.props.post.findNewerPostRequest()
  }
  childGetNewPost(e) {
    e.preventDefault()
    this.props.post.displayNewerPost()
  }
  render() {
    const { posts, findOlderFetching } = this.props
    const newPosts = posts.filter(t => !t.visibility)
    const visiblePosts = posts.filter(t => t.visibility)

    return (
      <main className='main' role='main'>
        <FindNewer
          getNewPost={this.childGetNewPost}
          newPostCount={newPosts.length}
        />
        {this.renderArticles(visiblePosts)}
        <FindOlder findOlderFetching={findOlderFetching}/>
      </main>
    )
  }
  componentDidMount() {
    this.interval = setInterval(this.detectNewPost, Config.post.findNewPostTime)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
}

Article.propTypes = {
  posts: PropTypes.array.isRequired,
  findOlderFetching: PropTypes.bool.isRequired,
}

const mapDispatchToProps = (dispatch) => {
  return {
    post: bindActionCreators(PostActions, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Article)
