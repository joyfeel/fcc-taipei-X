import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cx from 'classnames'
import Loading from '../Shared/Loading'


export const LoadingComment = () =>
  <div className=''>
    <Loading />
  </div>


export default LoadingComment
