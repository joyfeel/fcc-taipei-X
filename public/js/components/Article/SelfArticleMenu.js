import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cx from 'classnames'
import * as PopupActions from '../../actions/popup'
import { popupMethodToCode } from '../../utils/apicode'

class SelfArticleMenu extends Component {
  constructor(props) {
    super(props)
    this.deletePostPopup = this.deletePostPopup.bind(this)
  }
  deletePostPopup(e) {
    const { id, title, content } = this.props
    const code = popupMethodToCode[e.target.className]
    const deletePostPopup = { code, id, title, content }
    this.props.popup.popupRequest(deletePostPopup)
  }
  render() {
    const { show } = this.props
    return (
      <div className={cx('article-menu', { show })}>
        <i className='post-2'>Edit</i>
        <i className='cancel-3' onClick={this.deletePostPopup}>Delete</i>
      </div>
    )
  }
}

SelfArticleMenu.propTypes = {
  show: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

const mapDispatchToProps = (dispatch) => {
  return {
    popup: bindActionCreators(PopupActions, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(SelfArticleMenu)
