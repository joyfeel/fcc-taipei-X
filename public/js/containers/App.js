import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cx from 'classnames'
import Header from './Header'
import Loading from '../components/Shared/Loading'
import Popup from '../components/Shared/Popup'
import PostForm from '../components/PostForm/PostForm'
import * as AuthActions from '../actions/auth'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: false
    }
    this.expandPostForm = this.expandPostForm.bind(this)
    this.shrinkPostForm = this.shrinkPostForm.bind(this)
  }
  componentDidMount() {
    this.props.auth.refreshTokenRequest()
  }
  expandPostForm() {
    this.setState({ filter: true })
  }
  shrinkPostForm() {
    this.setState({ filter: false })
  }
  render() {
    const { globalFetching, isPopup, clearPopupMsg, popupMsg, profile } = this.props
    const { filter } = this.state

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
            expandPostForm={this.expandPostForm}
            shrinkPostForm={this.shrinkPostForm}
          />
        : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { isPopup, popupMsg, profile } = state.auth
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
