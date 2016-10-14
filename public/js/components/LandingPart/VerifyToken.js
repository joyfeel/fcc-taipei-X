import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthActions from '../../actions/auth'

class VerifyToken extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.auth.verifyEmailTokenRequest()
  }
  render() {
    return null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    auth: bindActionCreators(AuthActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(VerifyToken)
