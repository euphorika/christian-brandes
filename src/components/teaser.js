import React from "react"
import Link from "gatsby-link"
import Figure from "./figure"
import TeaserAnimation from "../components/teaserAnimation"
import styles from "../pages/index.module.scss"

class Teaser extends React.Component {

  render() {
    const { teaser, img } = this.props

    const inlineStyles = {
      marginTop: teaser.marginTop,
      flex: teaser.width
    }

    const indentStyles = {
      paddingLeft: teaser.paddingLeft,
      paddingRight: teaser.paddingRight
    }

    return (
      <div className={styles.col} style={inlineStyles}>
        <div style={indentStyles}>
          <TeaserAnimation>
            <Link to={teaser.slug}>
              <Figure teaser={teaser} img={img} />
            </Link>
          </TeaserAnimation>
        </div>
      </div>
    )
  }

}

export default Teaser
