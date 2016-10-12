import React, { Component } from 'react'
import cx from 'classnames'

const UploadAvatar = ({ upload, src }) => {
  //如果有上傳avatar，default icon會移除。
  const flag = src ? false : true

  return (
    <div className='upload-avatar-panel'>
      <input type='file' name='upload_avatar' className='upload-avatar-input' onChange={upload} />
      <img className='avatar-preview' alt='member avatar preview' src={src} />
      <i className={cx({'default-upload-avatar': flag})}></i>
    </div>
)}

export default UploadAvatar
