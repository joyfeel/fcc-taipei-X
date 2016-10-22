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
    const { isFetching, isPopup, clearResponse, res } = this.props

    return (
      <div>
        <Header />
        <div className={cx('wrapper', {mask: isFetching || isPopup})}>
          {this.props.children}
        </div>
        {isFetching ? <Loading /> : null}
        {isPopup ? <Popup res={res} clearResponse={clearResponse} isPopup={isPopup}/> : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { isFetching, isPopup, res } = state.auth
  return {
    isFetching,
    isPopup,
    res
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    auth: bindActionCreators(AuthActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
