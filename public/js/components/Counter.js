import React, { PropTypes } from 'react'

const Counter = ({counterValue, increment, decrement}) => {
  return (
    <div>
      {counterValue}
      {' '}
      <button onClick={increment}>
        +
      </button>
      {' '}
      <button onClick={decrement}>
        -
      </button>
    </div>
  )
}
//
// Counter.propTypes = {
//   counterValue: PropTypes.number.isRequired,
//   onIncrement: PropTypes.func.isRequired,
//   onDecrement: PropTypes.func.isRequired
// }

export default Counter
