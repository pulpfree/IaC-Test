import React from 'react'
import PropTypes from 'prop-types'

import Helmet from 'react-helmet'

import PageLayout from '../../../app/PageLayout'

import withStyles from 'material-ui/styles/withStyles'
import withRoot from '../../../app/withRoot'

import HomeShow from '../components/home-show'
import log from '../../../app/log'




const styles = {
  root: {
    margin: 0,
  },
  nuther: {
    margin: 20,
  },
}

const renderMetaData = () => (
  <Helmet
      meta={[{
        content: 'Pulpfree Client Example - Home page',
        name: 'description',
      }]}
      title="Pulpfree Client Example - Home"
  />
)

class Home extends React.Component { // eslint-disable-line react/no-multi-comp

  render() {
    // console.log('window.location:', window.location)
    log.info(window.location)
    return (
      <div className={this.props.classes.root}>
      <PageLayout>
        {renderMetaData()}
        <HomeShow />
      </PageLayout>
      </div>
    )
  }
}
Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(Home))
