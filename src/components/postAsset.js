import React from 'react'
import Img from "gatsby-image"
import PostCol from "../components/postCol"
import styles from "../pages/index.module.scss"

class PostAsset extends React.Component {

  render() {
    const { post, odd, nrCols } = this.props

    return (
      <PostCol post={post} odd={odd} nrCols={nrCols}>
        <Img sizes={post.asset.sizes} alt={post.asset.title} />
      </PostCol>
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
