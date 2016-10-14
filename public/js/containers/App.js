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
    const { isFetching, error, clearError } = this.props
    const wrapperClasses = cx({
      'wrapper': true,
      'mask': isFetching
    })
    return (
      <div>
        <Header />
        <div className={wrapperClasses}>
          {this.props.children}
        </div>
        {isFetching ? <Loading /> : null}
        {error ? <Popup error={error} clearError={clearError} /> : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { isFetching, error } = state.auth
  return {
    isFetching,
    error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    auth: bindActionCreators(AuthActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
