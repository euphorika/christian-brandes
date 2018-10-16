import React from "react"
import {Link} from "gatsby"
import Img from "gatsby-image"
import Figure from "./figure"
import TeaserAnimation from "../components/teaserAnimation"
import styles from "../pages/index.module.scss"

class Teaser extends React.Component {

  renderMedia(teaser) {
    if (!teaser.featuredImage.file.contentType.startsWith('video')) {
      return <Figure teaser={teaser} />
    }

    const date = new Date(teaser.date)

    return (
      <div className={styles.videoContainer}>
        <video poster={teaser.videoFallback ? teaser.videoFallback.sizes.src : null} playsInline autoPlay loop muted>
          <source src={teaser.featuredImage.file.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h2>{teaser.title}</h2>
        <p>{teaser.location},&nbsp;{date.toLocaleString('en-us', { month: 'long' })}&nbsp;{date.getFullYear()}</p>
      </div>
    )
  }

  renderTeaser(teaser, inlineStyles, indentStyles, oddOrEven) {
    return (
      <div className={styles.col} style={inlineStyles}>
        <div className={oddOrEven} style={indentStyles}>
          <TeaserAnimation>
            <Link to={teaser.slug}>
              {this.renderMedia(teaser)}
            </Link>
          </TeaserAnimation>
        </div>
      </div>
    )
  }

  renderDeadTeaser(teaser, inlineStyles, indentStyles, oddOrEven) {
    teaser.featuredImage = teaser.asset // awful

    return (
      <div className={styles.col} style={inlineStyles}>
        <div className={oddOrEven} style={indentStyles}>
          <TeaserAnimation>
            {this.renderMedia(teaser)}
          </TeaserAnimation>
        </div>
      </div>
    )
  }

  render() {
    const { col, isOdd } = this.props

    const inlineStyles = {
      marginTop: col.marginTop ? col.marginTop : 0,
      flex: col.width ? col.width / 100 : col.nrCols === 1 ? 0.7 : 1
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
