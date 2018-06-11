import React from "react"
import Link from "gatsby-link"
import Img from "gatsby-image"
import Lightbox from "../components/lightbox"
import AboutComponent from "../components/about"
import IconNavigation from "../components/iconNavigation"
import styles from "./layout.module.scss"

class IndexLayout extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { children } = this.props
    const { file } = this.props.data

    return (
      <div className={styles.page}>
        <header id="header" className={styles.header}>
          <Link className={styles.logo} to="/">
            <Img resolutions={file.childImageSharp.resolutions} alt="Christian Brandes - Photograph Logo" />
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
  }
}

export default IndexLayout

export const logoQuery = graphql`
  query LogoQuery {
    file(relativePath: { regex: "/christian-brandes-fotograf-logo.png/" }) {
      childImageSharp {
        resolutions(width: 25) {
          ...GatsbyImageSharpResolutions
        }
      }
    }
  }
`
