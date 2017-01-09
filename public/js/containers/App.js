import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cx from 'classnames'
import Header from './Header'
import Loading from '../components/Shared/Loading'
import Popup from '../components/Shared/Popup'
import PostForm from '../components/PostForm/PostForm'
import * as AuthActions from '../actions/auth'
import * as PopupActions from '../actions/popup'
import * as CombineActions from '../actions/combine'
import auth from '../utils/auth'

class App extends Component {
  constructor(props) {
    super(props)
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
    const { isFetching, isPostformOpen } = this.props
    return (
      <PostForm
        isPostformOpen={isPostformOpen}
        isFetching={isFetching}
      />
    )
  }
  render() {
    const { isFetching, isPostformOpen, isPopup, popupMsg, profile } = this.props
    const wrapperClasses = cx({
      'wrapper': true,
      'mask': isFetching || isPopup || isPostformOpen,
      'login': profile.token,
    })
    return (
      <div>
        <Header isPostformOpen={isPostformOpen} />
        <div className={wrapperClasses}>
          {this.props.children}
        </div>
        {isFetching ? <Loading /> : null }
        {isPopup ? this.renderPopup() : null }
        {profile.token ? this.renderPostForm() : null}
      </div>
    )
  }
  componentDidMount() {
    if (!auth.loggedIn()) {
      return
    }
    this.props.combine.refreshAppRequest()
  }
}

const mapStateToProps = (state) => {
  const { profile } = state.auth
  const { isPopup, popupMsg } = state.popup
  const { isFetching, isPostformOpen } = state.combine
  return {
    isFetching,
    isPostformOpen,
    isPopup,
    popupMsg,
    profile,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    auth: bindActionCreators(AuthActions, dispatch),
    popup: bindActionCreators(PopupActions, dispatch),
    combine: bindActionCreators(CombineActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
