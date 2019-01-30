import React from "react"
import PostCol from "../components/postCol"
import styles from "../pages/index.module.scss"
import { graphql } from 'gatsby'

const PostVimeoVideo = ({ post, odd, nrCols }) => (
  <PostCol post={post} odd={odd} nrCols={nrCols}>
    <div className={styles.videoContainer}>
      <div dangerouslySetInnerHTML={{ __html: post.embedVideo.embedVideo }} />
    </div>
  </PostCol>
)

export default PostVimeoVideo

export const query = graphql`
  fragment PostVimeoVideo on ContentfulPostVimeoVideo {
    embedVideo {
      embedVideo
    }
    width
    verticalPosition
    indentLeft
    indentRight
  }
`
