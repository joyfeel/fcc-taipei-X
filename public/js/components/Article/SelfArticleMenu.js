import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cx from 'classnames'
import * as PopupActions from '../../actions/popup'
import * as CombineActions from '../../actions/combine'
import { popupMethodToCode } from '../../utils/apicode'

class SelfArticleMenu extends Component {
  constructor(props) {
    super(props)
    this.deletePostPopup = this.deletePostPopup.bind(this)
    this.editformOpen = this.editformOpen.bind(this)
  }
  deletePostPopup(e) {
    // 若有 popup 的操作，都需要提供 popupCode
    const { id, title, content } = this.props
    const code = popupMethodToCode[e.target.className]
    const deletePostPopup = { code, id, title, content }
    this.props.popup.popupRequest(deletePostPopup)
  }
  editformOpen(e) {
    // edit 不會出現 popup，所以不需要提供 code
    const { id, title, content } = this.props
    this.props.combine.editformOpen({ id, title, content })
  }
  render() {
    const { show } = this.props
    return (
      <div className={cx('article-menu', { show })}>
        <i className='post-2' onClick={this.editformOpen}>Edit</i>
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
    combine: bindActionCreators(CombineActions, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(SelfArticleMenu)
