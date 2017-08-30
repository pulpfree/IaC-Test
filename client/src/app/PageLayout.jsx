import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import AppBar from 'material-ui/AppBar'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

import NavBar from './NavBar'

const footerHeight = '40px'

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  line-height: ${footerHeight};
  height: ${footerHeight};
  padding-left: 10px;
`

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  flex: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
})

const Page = ({classes, children, navBar}) => {
  return (
    <section>
      <AppBar position="static">
        <Toolbar>
          <IconButton
              aria-label="Menu"
              color="contrast"
          >
            <MenuIcon />
          </IconButton>
          <Typography
              className={classes.flex}
              color="inherit"
              type="title"
          >
            Pulpfree Web App
          </Typography>
          {navBar !== false && <NavBar classes={this.classes} />}
          <Button color="contrast">Login</Button>
        </Toolbar>
      </AppBar>
      <div id="content">
        {children}
      </div>
      <Footer>
        <div className="text-center">
          &copy; 2017. Pulpfree Client Example App.
        </div>
      </Footer>
    </section>
  )
}

Page.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  navBar: PropTypes.bool,
}

export default withStyles(styles)(Page)
