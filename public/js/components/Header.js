import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'

class Header extends Component {
  render() {
    console.log(this.props.token)
    console.log(this.props.user)
    return (
      <div>
        <ul>
          <li><IndexLink to="/">Home</IndexLink></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/login">Login</Link></li>
          { this.props.token ? (
              <div>
                <li><Link to="/logout">Logout</Link></li>
                <p>Hi, {this.props.user.name}. Your email is: {this.props.user.email}</p>
              </div>
            ) : (
              null
            )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    token: state.auth.token,
    user: state.auth.user
  }
}

// const mapStateToProps = (state) => ({
//   token: state.auth.token,
//   user: state.auth.user
// })

export default connect(mapStateToProps)(Header)
