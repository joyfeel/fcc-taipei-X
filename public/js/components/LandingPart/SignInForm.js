import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { signInRequest } from '../../actions'
import SignInSocialIcon from './SignInSocialIcon'
import SignInInputs from './SignInInputs'

class SignInForm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    const email = e.target.email.value.trim()
    const password = e.target.password.value.trim()
    this.props.dispatch(signInRequest({ email, password }))
  }
  render() {
    const { dispatch } = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <p className='sign-in-indicated'>Choosing 1 of these icons to sign in</p>
        <SignInSocialIcon />
        <SignInInputs />
        <p className='note'>@meet created by Wesley, Joey, Ching, Cha, Doma</p>
      </form>
    )
  }
}

SignInForm.propTypes = {
  dispatch: PropTypes.func
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps)(SignInForm)
