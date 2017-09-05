import React from 'react'

import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

const HomeShow = () => {
  return (
    <Paper
        className="root-paper"
        elevation={4}
    >
      <Typography
          gutterBottom
          type="display1"
      >
        HomeShow Component
      </Typography>
      <Typography
          gutterBottom
          type="subheading"
      >
        example project
      </Typography>
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

      <Button raised>
        Default
      </Button>
      <Button raised color="primary">
        Primary
      </Button>
      <Button raised color="accent">
        Accent
      </Button>
      <Button raised color="contrast">
        Contrast
      </Button>
      <Button raised color="accent" disabled>
        Disabled
      </Button>
      <input accept="jpg,jpeg,JPG,JPEG" style={{display: 'none'}} id="file" multiple type="file" />
      <label htmlFor="file">
        <Button raised component="span">
          Upload
        </Button>
      </label>
      <Button raised dense>
        Dense
      </Button>

    </Paper>
  )
}

export default HomeShow
