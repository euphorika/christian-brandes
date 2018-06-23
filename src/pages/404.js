import React from "react"
import Helmet from "react-helmet"
import Link from "gatsby-link"
import styles from "./404.module.scss"

export default () => (
  <div className={styles.page404}>
    <Helmet>
      <title>Page not found</title>
    </Helmet>
    <div>
      <h1>Page not found</h1>
      <p>You can return to homepage by clicking <Link to="/">here</Link>.</p>
    </div>
  </div>
)
