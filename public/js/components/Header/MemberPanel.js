import React, { Component } from 'react'

const MemberPanel = (props) =>
  <div className="member-panel">
    <span className="member-nickname">
      <span>Hi,&nbsp;</span>
        {props.profile.nickname || 'Don Corleone'}
    </span>
    <img src={props.profile.avatar || "/images/_mado.jpg"} className='member-avatar' alt="member-avatar" />
  </div>

export default MemberPanel
