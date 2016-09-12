import React, { Component } from 'react'

const SignFormNickname = ({ focus, blur, count }) =>
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
      onChange={count}
    />
    <label className='nickname-icon' htmlFor='nickname'></label>
  </div>

export default SignFormNickname
