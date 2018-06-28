import React from "react"
import Helmet from "react-helmet"
import PostRows from "../components/postRows"
import styles from "../pages/index.module.scss"

class PostVimeoTemplate extends React.Component {

  render() {
    const { contentfulVimeoPost } = this.props.data
    const { embedVimeo: { embedVimeo } } = contentfulVimeoPost
    const { postRow } = contentfulVimeoPost

    return (
      <div className={styles.singlePost}>
        <Helmet>
          <title>{contentfulVimeoPost.title}</title>
          <meta name="description" content={contentfulVimeoPost.metaDescription} />
          <style type="text/css">{`
            #header svg {
              fill: ${contentfulVimeoPost.color}
            }
            #footer,
            #footer a {
              color: ${contentfulVimeoPost.color}
            }
          `}</style>
        </Helmet>
        <div className={styles.posts + ' ' + styles.sticky}>
          <div className={styles.row}>
            <div className={styles.vimeoContainer}>
              <div className={styles.col} dangerouslySetInnerHTML={{__html: embedVimeo }} />
            </div>
          </div>
        </div>
        <div className={styles.posts}>
          <PostRows rows={postRow} />
        </div>
      </div>
    )
  }

}

export default PostVimeoTemplate

export const pageQuery = graphql`
  query VimeoPostByPath($slug: String!) {
    contentfulVimeoPost(slug: { eq: $slug }) {
      title
      metaDescription
      color
      embedVimeo {
        embedVimeo
      }
      postRow {
        __typename
        ... on ContentfulPostRow {
          postAsset {
            __typename
            ... on ContentfulPostAsset {
              ...PostAsset
            }
            ... on ContentfulPostVideo {
              ...PostVideoAsset
            }
          }
        }
        ... on ContentfulPostAsset {
          ...PostAsset
        }
        ... on ContentfulPostVideo {
          ...PostVideoAsset
        }
      }
    }
  }
`
