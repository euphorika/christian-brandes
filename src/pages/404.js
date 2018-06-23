import React from "react"
import Helmet from "react-helmet"
import Link from "gatsby-link"

export default () => (
  <div className="404-page">
    <Helmet>
      <title>Page not found</title>
    </Helmet>
    <div>
      <h1>Page not found</h1>
      <p>You can return to homepage by clicking <Link to="/">here</Link></p>
    </div>
  </div>
)
