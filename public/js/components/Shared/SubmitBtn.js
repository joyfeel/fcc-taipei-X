import React, { Component, PropTypes } from 'react'
import cx from 'classnames'

const SubmitBtn = (props) =>
  <button
    className={cx('submit-btn', props.toggleEmail)}
    role='submit'
    onClick={props.onClick}
    disabled={props.valid}
  >
    {props.txt}
  </button>

SubmitBtn.propTypes = {
  toggleEmail: PropTypes.string,
  txt: PropTypes.string.isRequired
}
SubmitBtn.defaultProps = {
  toggleEmail: null,
  valid: true
}

export default SubmitBtn
