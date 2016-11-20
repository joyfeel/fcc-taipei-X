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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: false,
    }
    this.setFilter = this.setFilter.bind(this)
  }
  setFilter(value) {
    this.setState({ filter: value })
  }
  renderPopup() {
    const { popupMsg, isPopup } = this.props
    return (
      <Popup
        popupMsg={popupMsg}
        isPopup={isPopup}
      />
    )
  }
  renderPostForm() {
    const { filter } = this.state
    return (
      <PostForm
        filter={filter}
        setFilter={this.setFilter}
      />
    )
  }
  render() {
    const { isFetching, isPopup, clearPopupMsg, profile } = this.props
    const { filter } = this.state
    const wrapperClasses = cx({
      'wrapper': true,
      'mask': isFetching || isPopup || filter,
      'login': profile.token,
    })
    return (
      <div>
        <Header filter={filter} />
        <div className={wrapperClasses}>
          {this.props.children}
        </div>
        {isFetching ? <Loading /> : null }
        {isPopup ? this.renderPopup() : null }
        {profile.token ? this.renderPostForm(): null}
      </div>
    )
  }
  componentDidMount() {
    this.props.auth.refreshTokenRequest()
  }
}

const mapStateToProps = (state) => {
  const { isPopup, popupMsg, profile } = state.auth
  const { isFetching } = state.combine
  const { newPost } = state.post
  return {
    isFetching,
    //globalFetching: state.auth.isFetching || state.post.isFetching,
    isPopup,
    popupMsg,
    profile,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    auth: bindActionCreators(AuthActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
