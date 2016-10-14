import React, { Component } from 'react'

class SignInSocialIcon extends Component {
  constructor(props) {
    super(props)
  }
  handleOauth(e, provider) {
    e.preventDefault()
    this.props.onOauthClick(provider)
  }
  render() {
    return (
      <div className='sign-in-social-icon'>
        <a href="" className='facebook' alt='facebook' onClick={ e => this.handleOauth(e, 'facebook') }></a>
        <a href="" className='twitter' alt='twitter' onClick={ e => this.handleOauth(e, 'twitter') }></a>
        <a href="" className='g-plus' alt='google-plus' onClick={ e => this.handleOauth(e, 'google') }></a>
        <a href="" className='github' alt='github' onClick={ e => this.handleOauth(e, 'github') }></a>
        <a href="" className='email' alt='email' onClick={this.props.onMailClick}></a>
      </div>
    )
  }
}

export default SignInSocialIcon
