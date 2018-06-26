import React from 'react'
import Img from "gatsby-image"
import TeaserAnimation from "../components/teaserAnimation"
import styles from "../pages/index.module.scss"

/* Video Teaser
   Post Row
   Post Teaser -> Wird auf Category oben angezeigt
   ?? */

class PostAsset extends React.Component {

  renderMedia(asset, poster) {
    if (!asset.file.contentType.startsWith('video')) {
      return <Img sizes={asset.sizes} alt={asset.title} />
    }

    return (
      <div className={styles.videoContainer}>
        <video poster={poster ? poster.sizes.src : null} playsInline autoPlay loop muted>
          <source src={asset.file.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }

  render() {
    const { post, isOdd, nrCols } = this.props

    const inlineStyles = {
      flex: post.width ? post.width / 100 : nrCols === 1 ? 0.7 : 1,
      marginTop: post.verticalPosition ? post.verticalPosition : '0',
    }

    const indentStyles = {
      paddingLeft: post.indentLeft ? post.indentLeft : 0,
      paddingRight: post.indentRight ? post.indentRight : 0
    }

    return (
      <div className={styles.col} style={inlineStyles}>
        <div className={isOdd ? styles.odd : styles.even} style={indentStyles}>
          <TeaserAnimation>
            {this.renderMedia(post.asset, post.videoFallback)}
          </TeaserAnimation>
        </div>
      </div>
    )
  }
}

export default PostAsset

export const query = graphql`
  fragment PostAsset on ContentfulPostAsset {
    width
    verticalPosition
    indentLeft
    indentRight
    asset {
      title
      sizes {
        ...GatsbyContentfulSizes_withWebp
      }
      file {
        contentType
        url
      }
    }
  }
`
