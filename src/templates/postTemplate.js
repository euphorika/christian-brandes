import React from "react"
import Helmet from "react-helmet"
import Img from "gatsby-image"
import TeaserAnimation from "../components/teaserAnimation"
import PostAsset from "../components/postAsset"
import PostVideoAsset from "../components/postVideoAsset"
import styles from "../pages/index.module.scss"

class PostTemplate extends React.Component {

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

  renderImages(postImages) {
    if (!postImages) {
      return
    }

    let isOdd = true

    return postImages.map((row, keyRow) => {

      const inlineStyles = {
        marginTop: row.verticalPosition ? row.verticalPosition : 0
      }

      switch(row.__typename)  {

        case 'ContentfulPostRow':
          return (
            <div key={keyRow} className={styles.row} style={inlineStyles}>
              {row.postAsset.map((col, keyCol) => {
                isOdd = !isOdd
                return <PostAsset key={keyCol} post={col} odd={isOdd} />
              })}
            </div>
          )

        case 'ContentfulPostAsset':
          isOdd = !isOdd
          return (
            <div key={keyRow} className={styles.row} style={inlineStyles}>
              <PostAsset post={row} odd={isOdd} nrCols={1} />
            </div>
          )

        case 'ContentfulPostVideo':
          isOdd = !isOdd
          return (
            <div key={keyRow} className={styles.row} style={inlineStyles}>
              <PostVideoAsset post={row} odd={isOdd} nrCols={1} />
            </div>
          )
      }
    })
  }

  render() {
    const { contentfulPost } = this.props.data
    const { postRow } = contentfulPost

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
          <div className={styles.row}>
            <div className={styles.col}>
              <TeaserAnimation>
                {this.renderMedia(contentfulPost.featuredImage, contentfulPost.videoFallback)}
              </TeaserAnimation>
            </div>
          </div>
        </div>
        <div className={styles.posts}>
          {this.renderImages(postRow)}
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
