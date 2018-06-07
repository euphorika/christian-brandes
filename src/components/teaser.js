import React from "react"
import Link from "gatsby-link"
import Figure from "./figure"
import styles from "../pages/index.module.scss"

class Teaser extends React.Component {

  render() {
    const { teaser, img } = this.props

    const inlineStyles = {
      marginTop: teaser.marginTop,
      flex: teaser.width
    }

    return (
      <div className={styles.col} style={inlineStyles}>
        <Link to={teaser.slug}>
          <Figure teaser={teaser} img={img} />
        </Link>
      </div>
    )
  }

}

export default Teaser
