import React, { Component, PropTypes } from 'react'

const SignFormNickname = ({ focus, blur, change }) =>
  <div className='sign-form-nickname'>
    <input
      type='text'
      name='nickname'
      id='nickname'
      placeholder='nickname'
      maxLength='20'
      className='nickname-input'
      onFocus={focus}
      onBlur={blur}
      onChange={change}
    />
    <label className='nickname-icon' htmlFor='nickname'></label>
  </div>

SignFormNickname.propTypes = {
  focus: PropTypes.func,
  blur: PropTypes.func,
  change: PropTypes.func
}


export default SignFormNickname
