import React from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo'
import Helmet from 'react-helmet'

import AddIcon from 'material-ui-icons/Add'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import withStyles from 'material-ui/styles/withStyles'

import ContactsTable from '../components/contacts-table'
import PageLayout from '../../../app/PageLayout'
import Wait from '../../common/components/waiting'
import withRoot from '../../../app/withRoot'

import CONTACTS_QUERY from '../graphql/contacts-get.graphql'


const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 3,
    minHeight: 500,
    // padding: theme.spacing.unit * 3,
  },
  heading: {
    padding: theme.spacing.unit * 2,
    // marginLeft: theme.spacing.unit * 2,
  },
  flex: {
    flex: 1,
  },
})

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

  renderContacts() {
    return <ContactsTable contacts={this.props.fetchContacts} />
  }

  render() {
    const { classes, loading } = this.props

    if (loading) {
      return (
        <PageLayout>
          {renderMetaData()}
          <Wait />

        </PageLayout>
      )
    }

    return (
      <PageLayout>
        {renderMetaData()}
        <Paper
            className={classes.root}
            elevation={4}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography
                  className={classes.flex}
                  color="inherit"
                  type="title"
              >
                Contacts List
              </Typography>
              <IconButton
                  aria-label="add"
                  color="contrast"
              >
                <AddIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <header className={classes.heading}>
            <Typography
                component="p"
                type="body1"
            >
              Paper can be used to build surface or other elements for your application.
            </Typography>
          </header>
          {this.renderContacts()}
        </Paper>
      </PageLayout>
    )
  }
}

ContactList.propTypes = {
  classes:        PropTypes.object.isRequired,
  fetchContacts:  PropTypes.array,
  loading:        PropTypes.bool.isRequired,
}

ContactList = compose( // eslint-disable-line no-class-assign
  graphql(CONTACTS_QUERY, {
    options: () => {
      return {
        variables: { active: true },
      }
    },
    props: ({ data }) => {
      const { loading, fetchContacts } = data
      return { loading, fetchContacts }
    },
  })
)(ContactList)

export default withRoot(withStyles(styles)(ContactList))
