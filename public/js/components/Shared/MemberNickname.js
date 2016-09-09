import React, { Component } from 'react'

const MemberNickname = ({ nickname }) =>
  <span className="member-nickname">
    <span className='hi'>Hi,&nbsp;</span>
      {nickname}
  </span>

export default MemberNickname
