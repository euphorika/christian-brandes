import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"
import { Location } from "@reach/router"
import Helmet from "react-helmet"

import Logo from "../components/logo"
import IconNavigation from "../components/iconNavigation"

import styles from "./layout.module.scss"

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query PageDefaultQuery {
        contentfulPage(slug: {eq: "default"}) {
          title
          metaDescription
        }
      }
    `}
    render={data => (
      <div className={styles.page}>
        <Helmet defaultTitle={data.contentfulPage.title} titleTemplate={`%s | ${data.contentfulPage.title}`}>
          <meta charSet="utf-8" />
          <meta name="description" content={data.contentfulPage.metaDescription} />
          <link rel="icon" type="image/png" href="favicon.png" />
        </Helmet>
        <header id="header" className={styles.header}>
          <div className={styles.logoContainer}>
            <Link className={styles.logo} to="/">
              <Logo />
            </Link>
          </div>
          <div className={styles.navigationContainer}>
            <Location>
              {({ location }) => (
                <Link to="/about" state={{ fromPage: location.pathname }}>
                  <nav role="navigation" className={styles.navigation}>
                    <IconNavigation />
                  </nav>
                </Link>
              )}
            </Location>
          </div>
        </header>
        <main id="main" className={styles.content}>
          {children}
        </main>
        <footer id="footer" className={styles.footer}>
          <div className={styles.copyright}>
            &copy; Christian Brandes
          </div>
          <nav role="navigation" className={styles.secondaryNavigation}>
            <Link to="/impress-data-privacy">Impressum &amp; Datenschutz</Link>
          </nav>
        </footer>
      </div>
    )}
  />
)
