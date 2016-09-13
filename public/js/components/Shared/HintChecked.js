import React, { Component } from 'react'
import cx from 'classnames'

const HintChecked = ({ show, count, valid }) => {
  const hintClass = cx({
    'hint-checked': true,
    'show': show,
    'valid' : valid
  })

  return (
    <p className={hintClass}>
      <span>
        {count}
      </span>/20
      <span className="hint-result">
        &nbsp;{valid ? null : '    At least 3 letters.'}
      </span>
    </p>
  )
}

export default HintChecked
