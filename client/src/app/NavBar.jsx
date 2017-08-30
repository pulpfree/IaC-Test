import React from 'react'
import { withStyles } from 'material-ui/styles'
import modules from '../modules'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  flex: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
})

const NavBar = (classes) => (
  <div className={classes.flex}>{modules.navItems}</div>
)

export default withStyles(styles)(NavBar)
