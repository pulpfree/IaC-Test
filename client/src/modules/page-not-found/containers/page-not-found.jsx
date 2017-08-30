import React from 'react'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'
// import { Button } from 'reactstrap'
import PageLayout from '../../../app/PageLayout'

const pageNotFound = () => (
  <PageLayout>
    <section className="text-center mt-4 mb-4">
      <Helmet
          meta={[{
            content: 'Apollo Starter Kit - Page not found',
            name: 'description',
          }]}
          title="Apollo Starter Kit - Page not found"
      />
      <h2>Page not found - 404</h2>
      <Link to="/">
        <button
            className="home-link"
            color="primary"
        >Go to Homepage</button>
      </Link>
    </section>
  </PageLayout>
)

export default pageNotFound
