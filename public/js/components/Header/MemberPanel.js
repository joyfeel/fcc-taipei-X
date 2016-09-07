import React, { Component } from 'react'
import MemberAvatar from '../Shared/MemberAvatar'
import MemberNickname from '../Shared/MemberNickname'

const MemberPanel = () =>
  <div className="member-panel">
    <MemberNickname />
    <MemberAvatar />
  </div>

export default MemberPanel
