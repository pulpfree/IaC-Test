import React from 'react'
import { Route, Link } from 'react-router-dom'

import Button from 'material-ui/Button'

import ContactList from './containers/contact-list'
import Feature from '../connector'
import reducers from './reducers'

export default new Feature({
  navItem:
      <Button
          className="navLink"
          color="contrast"
          component={Link}
          to="/contacts"
      >Contacts</Button>,
  reducer: { contact: reducers },
  route:
    <Route
        component={ContactList}
        exact
        path="/contacts"
    />,
})
