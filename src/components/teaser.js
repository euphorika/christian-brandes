import React from "react"
import Link from "gatsby-link"
import Figure from "./figure"
import TeaserAnimation from "../components/teaserAnimation"
import styles from "../pages/index.module.scss"

class Teaser extends React.Component {

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

    return (
      <div className={styles.col} style={inlineStyles}>
        <div className={oddOrEven} style={indentStyles}>
          <TeaserAnimation>
            <Link to={col.teaser.slug}>
              <Figure teaser={col.teaser} />
            </Link>
          </TeaserAnimation>
        </div>
      </div>
    )
  }

}

export default Teaser
