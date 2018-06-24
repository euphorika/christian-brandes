import React from "react"
import Link from "gatsby-link"
import Img from "gatsby-image"
import Helmet from "react-helmet"
import Logo from "../components/logo"
import IconNavigation from "../components/iconNavigation"
import styles from "./layout.module.scss"

export default ({ children }) => (
  <div className={styles.page}>
    <Helmet defaultTitle={`Christian Brandes - Photograph`} titleTemplate={`%s | Christian Brandes - Photograph`}>
      <meta charSet="utf-8" />
      <meta name="description" content="Christian Brandes - Photograph based in Hamburg" />
    </Helmet>
    <header id="header" className={styles.header}>
      <Link className={styles.logo} to="/">
        <Logo />
      </Link>
      <Link to="/about">
        <nav role="navigation" className={styles.navigation}>
          <IconNavigation />
        </nav>
      </Link>
    </header>
    <main id="main" className={styles.content}>
      {children()}
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
)
