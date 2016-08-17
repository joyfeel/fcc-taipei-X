import React, { Component } from 'react'
import AppContainer from '../containers/AppContainer'

export default class AppPage extends Component {
  render() {
    return (
      <AppContainer>
        {this.props.children}
      </AppContainer>
    )
  }
}
