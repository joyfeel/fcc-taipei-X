import React, { Component } from 'react'

import SignTabs from './SignTabs'

//temp
// import SignInForm from './SignInForm'
class SignForm extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    //console.log('SignForm componentDidMount')
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


// const SignForm = (props) =>
//   <div className='sign-form'>
//     <SignTabs />
//     {props.children}
//   </div>

export default SignForm
