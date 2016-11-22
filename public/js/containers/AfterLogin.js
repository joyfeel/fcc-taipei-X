import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Article from '../components/Article/Article'

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
}

const mapStateToProps = (state) => {
  const { postList } = state.post
  return {
    postList,
  }
}

export default connect(mapStateToProps, null)(AfterLogin)
