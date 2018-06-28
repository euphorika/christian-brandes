import React from "react"
import Helmet from "react-helmet"
import PostRow from "../components/postRow"
import PostRows from "../components/postRows"
import styles from "../pages/index.module.scss"

class PostTemplate extends React.Component {

  render() {
    const { contentfulPost } = this.props.data
    const { postRow } = contentfulPost

    const teaser = postRow ? postRow[0] : []
    const rows = postRow ? postRow.slice(1) : []

    return (
      <div className={styles.singlePost}>
        <Helmet>
          <title>{contentfulPost.title}</title>
          <meta name="description" content={contentfulPost.metaDescription} />
          <style type="text/css">{`
            #header svg {
              fill: ${contentfulPost.color}
            }
            #footer,
            #footer a {
              color: ${contentfulPost.color}
            }
          `}</style>
        </Helmet>
        <div className={styles.posts + ' ' + styles.sticky}>
          <PostRow row={teaser} />
        </div>
        <div className={styles.posts}>
          <PostRows rows={rows} />
        </div>
      </div>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query PostByPath($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      title
      metaDescription
      color
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
