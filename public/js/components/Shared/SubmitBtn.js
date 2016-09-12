import React, { Component, PropTypes } from 'react'

const SubmitBtn = (props) =>
  <button className={`submit-btn ${props.toggleEmail}`} role='submit' onClick={props.onClick}>{props.txt}</button>

SubmitBtn.propTypes = {
  txt: PropTypes.string.isRequired
}

export default SubmitBtn
