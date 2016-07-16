import React, { Component } from 'react'
import { connect } from 'react-redux'
import { googleLogin } from '../actions/oauth'

class Login extends Component {
  render() {
    return (
      <div>
        <h3>Login</h3>
        <button onClick={() => { this.props.dispatch({ type: 'loginThirdParty', provider: 'google' }) }}>Google</button>
        <hr />
        <button onClick={() => { this.props.dispatch({ type: 'loginThirdParty', provider: 'facebook' }) }}>Facebook</button>
        <hr />
        <button onClick={() => { this.props.dispatch({ type: 'loginThirdParty', provider: 'github' }) }}>Github</button>
        <hr />
      </div>
    )
  }
}

//googleLogin()

export default connect()(Login)
