import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cx from 'classnames'
import Header from './Header'
import Loading from '../components/Shared/Loading'
import Popup from '../components/Shared/Popup'
import * as AuthActions from '../actions/auth'

class App extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.auth.refreshTokenRequest()
  }
  render() {
    const { globalFetching, isPopup, clearPopupMsg, popupMsg } = this.props
    return (
      <div>
        <Header />
        <div className={cx('wrapper', {mask: globalFetching || isPopup})}>
          {this.props.children}
        </div>
        {globalFetching ? <Loading /> : null}
        {isPopup ? <Popup popupMsg={popupMsg} isPopup={isPopup} /> : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { isPopup, popupMsg } = state.auth
  console.log(state.post.isFetching)
  return {
    globalFetching: state.auth.isFetching || state.post.isFetching,
    isPopup,
    popupMsg,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    auth: bindActionCreators(AuthActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
