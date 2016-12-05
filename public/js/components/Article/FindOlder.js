import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cx from 'classnames'
import Loading from '../Shared/Loading'

export const FindOlder = ({ findOlderFetching }) =>
  <div className={cx('find-older', { on: findOlderFetching })}>
    <Loading />
  </div>


FindOlder.propTypes = {
  findOlderFetching: PropTypes.bool.isRequired,
}


export default FindOlder
