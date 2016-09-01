import React, { Component } from 'react'
import MemberAvatar from './MemberAvatar'
import MemberNickname from './MemberNickname'

const MemberPanel = () =>
  <div className="member-panel">
    <MemberNickname />
    <MemberAvatar />
  </div>

export default MemberPanel
