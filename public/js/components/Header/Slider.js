import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'


class Slider extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { isSlider, status, sliderMsg } = this.props
    const sliderClass = cx({
      'slider': true,
      'down': isSlider,
      'failure': (status === 'error') ? true : false,
    })

    return (
    <div className={sliderClass}>
      { isSlider ? sliderMsg.message : null }
    </div>
  )}
}

const mapStateToProps = (state) => {
  const { slider } = state
  return slider
}

Slider.propTypes = {
  slider: PropTypes.object,
}

export default connect(mapStateToProps)(Slider)
