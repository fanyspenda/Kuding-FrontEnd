import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Consumer } from '../App'

export default class PrivateRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props

    return (
      <Consumer>
        {({ isLoggedIn }) => (
          <Route
            {...rest}
            render={props =>
              isLoggedIn() ? <Component {...props} /> : <Redirect to="/login" />
            }
          />
        )}
      </Consumer>
    )
  }
}
