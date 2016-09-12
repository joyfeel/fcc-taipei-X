import React, { Component } from 'react'
import cx from 'classnames'
class SignFormPassword extends Component {
  constructor(props) {
    super(props)
    this.state = { eye : false }
    this.visible = this.visible.bind(this)
  }

  visible() {
    this.setState({ eye : !this.state.eye })
  }

  render() {
    const { eye } = this.state

    const eyes = cx({
      'eye-opened': eye,
      'eye-closed': !eye
    })

    return (
    <div className='sign-form-password'>
      <input type={eye ? "text" : "password"} name="password"  id="password" placeholder='password' className="password-input"/>
      <label className='password-icon' htmlFor="password"></label>
      <i className={eyes} onClick={this.visible}></i>
    </div>
  )}
}

export default SignFormPassword
