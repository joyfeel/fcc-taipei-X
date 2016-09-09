import React, { Component } from 'react'

const SubmitBtn = ({txt}) =>
  <button className='submit-btn' role='submit'>{txt}</button>


SubmitBtn.propTypes = {
  txt: React.PropTypes.string.isRequired
}


export default SubmitBtn
