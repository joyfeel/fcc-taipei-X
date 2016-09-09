import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import Header from './Header'
import Loading from '../components/Shared/Loading'
import Popup from '../components/Shared/Popup'

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { isFetching, error, dispatch } = this.props
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
        {error ? <Popup error={error} dispatch={dispatch} /> : null}
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

export default connect(mapStateToProps)(App)
