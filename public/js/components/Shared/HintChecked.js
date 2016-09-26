import React, { Component, PropTypes } from 'react'
import cx from 'classnames'

const HintChecked = ({ nickname, email, password, valid, count, msg}) => {
  const hintClass = cx({
    'hint-checked': true,
    'nickname': nickname,
    'hint-email': email,
    'hint-password': password,
    'valid': valid
  })

  return (
    <p className={hintClass}>
      {nickname ? `${count}/20` : null}
      {email ? 'email' : null}
      {password ?  `${count}/12` : null}

      <span className='hint-result'>
        &nbsp;
        {msg}
      </span>
    </p>
  )
}


HintChecked.propTypes = {
  nickname: PropTypes.bool,
  email: PropTypes.bool,
  password: PropTypes.bool,
  valid: PropTypes.bool,
  count: PropTypes.number,
  msg: PropTypes.string
}

HintChecked.defaultProps = {
  nickname: false,
  email: false,
  password: false,
  valid: false,
  count: 0,
  msg: ''
}

export default HintChecked
