import React from "react"
import { Link } from "gatsby"
import Figure from "./figure"
import TeaserAnimation from "../components/teaserAnimation"
import Helmet from 'react-helmet'
import Hash from 'object-hash'

import styles from "../pages/index.module.scss"

class Teaser extends React.Component {

  _renderTitle(title) {
    if (!title) {
      return
    }

    return <h2>{title}</h2>
  }

  _renderLocation(location, date) {
    if (!location && !date) {
      return
    }

    if (!location) {
      return <p>{date.toLocaleString('en-us', { month: 'long' })}&nbsp;{date.getFullYear()}</p>
    }

    if (!date) {
      return <p>{location}</p>
    }

    return <p>{location},&nbsp;{date.toLocaleString('en-us', { month: 'long' })}&nbsp;{date.getFullYear()}</p>
  }

  renderMedia(teaser) {
    if (!teaser.featuredImage.file.contentType.startsWith('video')) {
      return <Figure teaser={teaser} />
    }

    const date = teaser.date && new Date(teaser.date)

    return (
      <div className={styles.videoContainer}>
        <video poster={teaser.videoFallback ? teaser.videoFallback.sizes.src : null} playsInline autoPlay loop muted>
          <source src={teaser.featuredImage.file.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {this._renderTitle(teaser.title)}
        {this._renderLocation(teaser.location, date)}
      </div>
    )
  }

  renderTeaser(teaser, helmet, colIdentifier, oddOrEven) {
    return (
      <div className={styles.col + ' ' + colIdentifier}>
        {helmet}
        <div className={oddOrEven}>
          <TeaserAnimation>
            <Link to={teaser.slug}>
              {this.renderMedia(teaser)}
            </Link>
          </TeaserAnimation>
        </div>
      </div>
    )
  }

  renderDeadTeaser(teaser, helmet, colIdentifier, oddOrEven) {
    teaser.featuredImage = teaser.asset // awful

    return (
      <div className={styles.col + ' ' + colIdentifier}>
        {helmet}
        <div className={oddOrEven}>
          <TeaserAnimation>
            {this.renderMedia(teaser)}
          </TeaserAnimation>
        </div>
      </div>
    )
  }

  renderTextTeaser(teaser, helmet, colIdentifier, oddOrEven) {
    return (
      <div className={styles.col + ' ' + colIdentifier}>
        {helmet}
        <div className={oddOrEven}>
          <TeaserAnimation>
            <div className={styles.textContainer} dangerouslySetInnerHTML={{__html: teaser.longText.childMarkdownRemark.html}} />
          </TeaserAnimation>
        </div>
      </div>
    )
  }

  render() {
    const { col, isOdd } = this.props

    const inlineStyles = {
      marginTop: col.verticalPosition ? col.verticalPosition : 0,
      flex: col.width ? col.width / 100 : col.nrCols === 1 ? 0.7 : 1
    }

    const indentStyles = {
      paddingLeft: col.indentLeft ? col.indentLeft : 0,
      paddingRight: col.indentRight ? col.indentRight : 0
    }

    const styleHash = Hash({
      inlineStyles,
      indentStyles
    })
    const colIdentifier = styles.col + '-' + styleHash
    const helmet = <Helmet>
      <style type="text/css">{`
        .${styles.posts}
        .${styles.row}
        .${styles.col}.${colIdentifier} {
          flex: ${inlineStyles.flex};
          margin-top: ${inlineStyles.marginTop};
        }

        @media only screen and (min-width: 667px) {
          .${styles.posts}
          .${styles.row}
          .${styles.col}.${colIdentifier} > div {
            padding-left: ${indentStyles.paddingLeft};
            padding-right: ${indentStyles.paddingRight};
          }
        }
      `}</style>
    </Helmet>

    let oddOrEven = ''

    if (isOdd !== undefined) {
      oddOrEven = isOdd ? styles.odd : styles.even
    }

    if (col.__typename === 'ContentfulDeadCategoryTeaser') {
      return this.renderDeadTeaser(col, helmet, colIdentifier, oddOrEven)
    }

    if (col.__typename === 'ContentfulTextTeaser') {
      return this.renderTextTeaser(col, helmet, colIdentifier, oddOrEven)
    }

    return this.renderTeaser(col.teaser, helmet, colIdentifier, oddOrEven)
  }

}

export default Teaser
