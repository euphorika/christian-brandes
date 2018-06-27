import React from 'react'
import Img from "gatsby-image"
import TeaserAnimation from "../components/teaserAnimation"
import styles from "../pages/index.module.scss"

class PostAsset extends React.Component {

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
            <Img sizes={post.asset.sizes} alt={post.asset.title} />
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
    }
  }
`
