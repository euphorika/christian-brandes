import React from "react"
import Link from "gatsby-link"
import Img from "gatsby-image"
import Figure from "./figure"
import TeaserAnimation from "../components/teaserAnimation"
import styles from "../pages/index.module.scss"

class Teaser extends React.Component {

  renderTeaser(teaser, inlineStyles, indentStyles, oddOrEven) {
    return (
      <div className={styles.col} style={inlineStyles}>
        <div className={oddOrEven} style={indentStyles}>
          <TeaserAnimation>
            <Link to={teaser.slug}>
              <Figure teaser={teaser} />
            </Link>
          </TeaserAnimation>
        </div>
      </div>
    )
  }

  renderDeadTeaser(teaser, inlineStyles, indentStyles, oddOrEven) {
    return (
      <div className={styles.col} style={inlineStyles}>
        <div className={oddOrEven} style={indentStyles}>
          <TeaserAnimation>
            <Img sizes={teaser.asset.sizes} alt={teaser.asset.title} />
          </TeaserAnimation>
        </div>
      </div>
    )
  }

  render() {
    const { col, isOdd } = this.props

    const inlineStyles = {
      marginTop: col.marginTop ? col.marginTop : 0,
      flex: col.width ? col.width / 100 : 1
    }

    const indentStyles = {
      paddingLeft: col.paddingLeft ? col.paddingLeft : 0,
      paddingRight: col.paddingRight ? col.paddingRight : 0
    }

    let oddOrEven = ''

    if (isOdd !== undefined) {
      oddOrEven = isOdd ? styles.odd : styles.even
    }

    if (col.__typename === 'ContentfulDeadCategoryTeaser') {
      return this.renderDeadTeaser(col, inlineStyles, indentStyles, oddOrEven)
    }

    return this.renderTeaser(col.teaser, inlineStyles, indentStyles, oddOrEven)
  }

}

export default Teaser
