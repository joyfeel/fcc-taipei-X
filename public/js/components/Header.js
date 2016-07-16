import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'

class Header extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><IndexLink to="/">Home</IndexLink></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  user: state.auth.user
})

export default connect(mapStateToProps)(Header)
