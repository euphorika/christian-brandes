import React from "react"
import styles from "../pages/index.module.scss"

class PostVideoAsset extends React.Component {

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

    return(
      <div className={styles.col} style={inlineStyles}>
        <div className={isOdd ? styles.odd : styles.even} style={indentStyles}>
          <div className={styles.videoContainer}>
            <video poster={post.poster ? post.poster.sizes.src : null} playsInline autoPlay loop muted>
              <source src={post.asset.file.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    )
  }

}

export default PostVideoAsset

export const query = graphql`
  fragment PostVideoAsset on ContentfulPostVideo {
    width
    verticalPosition
    indentLeft
    indentRight
    asset {
      file {
        url
      }
    }
    poster {
      sizes {
        src
      }
    }
  }
`
