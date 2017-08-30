import React from 'react'
import PropTypes from 'prop-types'

import Helmet from 'react-helmet'

import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import withStyles from 'material-ui/styles/withStyles'

import withRoot from '../../../app/withRoot'
import PageLayout from '../../../app/PageLayout'


const styles = {
  root: {
    margin: 20,
    minHeight: 500,
    padding: 30,
  },
}

const renderMetaData = () => (
    <Helmet
        meta={[{
          content: 'Pulpfree - Contact List',
          name: 'description',
        }]}
        title="Pulpfree - Contact List"
    />
  )

class ContactList extends React.Component { // eslint-disable-line react/no-multi-comp

  render() {
    const { classes } = this.props
    return (
      <PageLayout>
        {renderMetaData()}
        <Paper
            className={classes.root}
            elevation={4}
        >
        <Typography
            component="h3"
            type="headline"
        >
          This is a sheet of paper.
        </Typography>
        <Typography
            component="p"
            type="body1"
        >
          Paper can be used to build surface or other elements for your application.
        </Typography>
      </Paper>
      </PageLayout>
    )
  }
}

ContactList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(ContactList))
