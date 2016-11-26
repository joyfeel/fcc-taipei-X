import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cx from 'classnames'
import Loading from '../Shared/Loading'


export const FindOlder = () =>
  <div className='find-older off'>
    <Loading />
  </div>


export default FindOlder
