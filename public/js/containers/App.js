import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './Header'

//temp
// import SignForm from '../components/LandingPart/SignForm'


class App extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    //console.log('App componentDidMount')
  }
  componentWillReceiveProps() {
    //console.log('App componentWillReceiveProps')
  }
  render() {
    console.log(this.props.isFetching)
    return (
      <div>
        <Header />
        <div className='wrapper'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    profile: {
      token: state.auth.profile.token
    },
    error: state.auth.error,
  }
}

export default connect(mapStateToProps)(App)
