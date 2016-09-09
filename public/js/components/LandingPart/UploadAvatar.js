import React, { Component } from 'react'

class UploadAvatar extends Component {
  constructor(props) {
    super(props)
    this.state ={
      src : './images/default-upload-avatar.svg'
    }

    this.upload = this.upload.bind(this)
  }

  upload(e) {
    const bHaveFileAPI = (window.File && window.FileReader)
    const self = this
    if (!bHaveFileAPI) {
      alert("This browser doesn't support the File API")
      return
    }
    const thefile = e.target.files[0]

    // check to see if it is text
    if (!thefile.type.match("image.*")) {
      alert("This type of the upload file is not support")
      return
    }
    var reader = new FileReader()

    reader.onload = function (evt) {
      let resultdata = evt.target.result
      self.setState({src : resultdata})
    }
    reader.readAsDataURL(thefile)
  }

  render() {
    return (
      <div className='upload-avatar-panel'>
        <input type='file' name='upload_avatar' className='upload-avatar-input' onChange={this.upload} />
        <img className='avatar-preview' alt='member avatar preview' src={this.state.src} />
      </div>
    )
  }
}

export default UploadAvatar
