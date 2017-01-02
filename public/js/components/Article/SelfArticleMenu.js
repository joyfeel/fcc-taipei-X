import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as PopupActions from '../../actions/popup'
import * as CombineActions from '../../actions/combine'
import cx from 'classnames'



class SelfArticleMenu extends Component {
  constructor(props) {
    super(props)
    this.detectPostPopup = this.detectPostPopup.bind(this)
  }

  detectPostPopup(e) {
    const { id, title, content } = this.props

    switch (e.target.className) {
      case 'cancel-3':
      // for delete post icon popup via utils/apicode.js
      const deletePostPopup = { code: 100002, id: id, title: title, content: content }
      this.props.popup.popupRequest(deletePostPopup)
        break
      case 'post-2':
        this.props.combine.editformOpen({ id, title, content })
        break
    }
  }

  render() {
    const { show } = this.props
    return (
      <div className={cx('article-menu', { show })}>
        <i className='post-2' onClick={this.detectPostPopup}>Edit</i>
        <i className='cancel-3' onClick={this.detectPostPopup}>Delete</i>
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
    combine: bindActionCreators(CombineActions, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(SelfArticleMenu)
