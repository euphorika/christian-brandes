import React from "react"
import Helmet from "react-helmet"
import PostAsset from "../components/postAsset"
import PostVideoAsset from "../components/postVideoAsset"
import styles from "../pages/index.module.scss"

class PostTemplate extends React.Component {

  renderRow(row, key = 'teaser', isOdd = {}) {
    const inlineStyles = {
      marginTop: row.verticalPosition ? row.verticalPosition : 0
    }

    switch(row.__typename)  {

      case 'ContentfulPostRow':
        return (
          <div key={key} className={styles.row} style={inlineStyles}>
            {row.postAsset.map((col, keyCol) => {
              isOdd.value = !isOdd.value

              if (col.__typename === 'ContentfulPostAsset') {
                return <PostAsset key={keyCol} post={col} odd={isOdd.value} nrCols={row.postAsset.length} />
              }

              if (col.__typename === 'ContentfulPostVideo') {
                return <PostVideoAsset key={keyCol} post={col} odd={isOdd.value} nrCols={row.postAsset.length} />
              }
            })}
          </div>
        )

      case 'ContentfulPostAsset':
        isOdd.value = !isOdd.value
        return (
          <div key={key} className={styles.row} style={inlineStyles}>
            <PostAsset post={row} odd={isOdd.value} nrCols={1} />
          </div>
        )

      case 'ContentfulPostVideo':
        isOdd.value = !isOdd.value
        return (
          <div key={key} className={styles.row} style={inlineStyles}>
            <PostVideoAsset post={row} odd={isOdd.value} nrCols={1} />
          </div>
        )
    }
  }

  renderImages(postImages) {
    if (!postImages) {
      return
    }

    let isOdd = {
      value: true
    }

    return postImages.map((row, keyRow) => this.renderRow(row, keyRow, isOdd))
  }

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
          {this.renderRow(teaser)}
        </div>
        <div className={styles.posts}>
          {this.renderImages(rows)}
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
      featuredImage {
        title
        sizes {
          ...GatsbyContentfulSizes_withWebp
        }
        file {
          contentType
          url
        }
      }
      videoFallback {
        sizes {
          src
        }
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
`;
