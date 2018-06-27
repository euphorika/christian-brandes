import React from "react"
import PostCol from "../components/postCol"
import styles from "../pages/index.module.scss"

class PostVideoAsset extends React.Component {

  render() {
    const { post, odd, nrCols } = this.props

    return(
      <PostCol post={post} odd={odd} nrCols={nrCols}>
        <div className={styles.videoContainer}>
          <video poster={post.poster ? post.poster.sizes.src : null} playsInline autoPlay loop muted>
            <source src={post.asset.file.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </PostCol>
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
