import React, { Component } from 'react'

const MemberAvatar = ({ avatar }) =>
  <img src={avatar || "/images/_mado.jpg"} className='member-avatar' alt="member-avatar" />

export default MemberAvatar
