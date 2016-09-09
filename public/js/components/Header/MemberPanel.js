import React, { Component } from 'react'
import MemberAvatar from '../Shared/MemberAvatar'
import MemberNickname from '../Shared/MemberNickname'

const MemberPanel = ({ profile }) =>
  <div className="member-panel">
    <MemberNickname nickname={profile.nickname} />
    <MemberAvatar avatar={profile.avatar}  />
  </div>

export default MemberPanel
