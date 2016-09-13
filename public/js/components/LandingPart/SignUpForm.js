import React, { Component } from 'react'
import UploadAvatar from './UploadAvatar'
import HintChecked from '../Shared/HintChecked'
import SignFormNickname from '../Shared/SignFormNickname'
import SignFormEmail from '../Shared/SignFormEmail'
import SignFormPassword from '../Shared/SignFormPassword'
import SubmitBtn from '../Shared/SubmitBtn'
import cx from 'classnames'


class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      valid: false,
      count: 0
    }

    this.focus = this.focus.bind(this)
    this.blur =this.blur.bind(this)
    this.count = this.count.bind(this)
  }

  focus() {
    this.setState({ show: true })
  }

  blur() {
    this.setState({ show: false })
  }

  count(e) {
    const count = e.target.value.trim().length

    this.setState({
      count,
      valid : count > 2 ? true : false
    })
  }

  render() {
    const { show, count, valid } = this.state


    return (
      <form className='sign-up-form'>
        <UploadAvatar />
        <SignFormNickname
          focus={this.focus}
          blur={this.blur}
          count={this.count}
        />
        <HintChecked
          show={show}
          count={count}
          valid={valid}
        />
        <SignFormEmail />
        <SignFormPassword />
        <HintChecked />

        <SubmitBtn txt={'SIGN UP'} />
        <p className='signup note'>@meet created by Wesley, Joey, Ching, Cha, Doma</p>
      </form>
  )}
}

export default SignUpForm
