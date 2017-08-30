import React from 'react'
import { Link, Route } from 'react-router-dom'

import Button from 'material-ui/Button'

import Home from './containers/home'
import reducers from './reducers'
import Feature from '../connector'

export default new Feature({
  navItem:
    <Button
        className="navLink"
        color="contrast"
        component={Link}
        to="/"
    >Home</Button>,
  reducer: { counter: reducers },
  route:
    <Route
        component={Home}
        exact
        path="/"
    />,
})
