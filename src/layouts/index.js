import React from "react"
import Link from "gatsby-link"
import Lightbox from "../components/lightbox"
import AboutComponent from "../components/about"
import styles from "./layout.module.scss"

class IndexLayout extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { children } = this.props

    return (
      <div className={styles.page}>
        <header id="header" className={styles.header}>
          <Link to="/">
            <img className={styles.logo} src="/assets/christian-brandes-fotograf-logo.png" alt="Christian Brandes - Photograph Logo" />
          </Link>
          <Link to="/about">
            <nav role="navigation" className={styles.navigation}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><path d="M0 0h500v92.3H0zM0 407.7h500V500H0zM0 203.9h500v92.3H0z"/></svg>
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
  }
}

export default IndexLayout
