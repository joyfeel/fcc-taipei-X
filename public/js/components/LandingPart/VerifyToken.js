import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'

class VerifyToken extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.verifyEmailTokenRequest()
  }
  render() {
    return null
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch)
}

export default connect(null, mapDispatchToProps)(VerifyToken)
