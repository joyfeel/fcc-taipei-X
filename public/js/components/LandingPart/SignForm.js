import React, { Component } from 'react'
import SignTabs from './SignTabs'

class SignForm extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='sign-form'>
        <SignTabs />
        {this.props.children}
      </div>
    )
  }
}

export default SignForm
