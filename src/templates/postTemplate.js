import React from "react"
import Helmet from "react-helmet"
import PostRow from "../components/postRow"
import PostRows from "../components/postRows"
import styles from "../pages/index.module.scss"

class PostTemplate extends React.Component {

  renderTeaser(teaser, vimeo) {
    if (vimeo && vimeo.embedVimeo) {
      return (
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.vimeoContainer}>
              <div dangerouslySetInnerHTML={{__html: vimeo.embedVimeo}} />
            </div>
          </div>
        </div>
      )
    }

    return <PostRow row={teaser} />
  }

  render() {
    const { contentfulPost } = this.props.data
    const { embedVimeo } = contentfulPost
    const { postRow } = contentfulPost

    let teaser
    let rows

    if (embedVimeo && embedVimeo.embedVimeo) {
      teaser = []
      rows = postRow
    } else {
      teaser = postRow ? postRow[0] : []
      rows = postRow ? postRow.slice(1) : []
    }



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
          {this.renderTeaser(teaser, embedVimeo)}
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
