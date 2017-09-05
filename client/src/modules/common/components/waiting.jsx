import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

import { CircularProgress } from 'material-ui/Progress'

const styles = () => ({
  container: {
    position: 'relative',
    textAlign: 'center',
    padding: 40,
    width: '100%',
  },
})

const Waiting = (props) => {
  const classes = props.classes
  return (
    <div className={classes.container}>
      <CircularProgress
          color="accent"
          size={50}
      />
    </div>
  )
}

Waiting.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Waiting)
