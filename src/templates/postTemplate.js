import React from "react"
import Helmet from "react-helmet"
import Img from "gatsby-image"
import TeaserAnimation from "../components/teaserAnimation"
import styles from "../pages/index.module.scss"

class PostTemplate extends React.Component {

  renderMedia(asset) {
    if (!asset.file.contentType.startsWith('video')) {
      return   <Img sizes={asset.sizes} alt={asset.title} />
    }

    return (
      <div className={styles.videoContainer}>
        <video autoPlay loop>
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

      return (
        <div key={keyRow} className={styles.row} style={inlineStyles}>
          {row.postAsset.map((col, keyCol) => {

            const inlineStyles = {
              flex: col.width ? col.width / 100 : 1,
              marginTop: col.verticalPosition ? col.verticalPosition : '0',
            }

            const indentStyles = {
              paddingLeft: col.indentLeft ? col.indentLeft : 0,
              paddingRight: col.indentRight ? col.indentRight : 0
            }

            isOdd = !isOdd

            return (
              <div key={keyCol} className={styles.col} style={inlineStyles}>
                <div className={isOdd ? styles.odd : styles.even} style={indentStyles}>
                  <TeaserAnimation>
                    {this.renderMedia(col.asset)}
                  </TeaserAnimation>
                </div>
              </div>
            )
          })}
        </div>
      )
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
        </Helmet>
        <div className={styles.posts + ' ' + styles.sticky}>
          <div className={styles.row}>
            <div className={styles.col}>
              <TeaserAnimation>
                {this.renderMedia(contentfulPost.featuredImage)}
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
      featuredImage {
        title
        sizes {
          ...GatsbyContentfulSizes_withWebp_noBase64
        }
        file {
          contentType
          url
        }
      }
      postRow {
        postAsset {
          width
          verticalPosition
          indentLeft
          indentRight
          asset {
            title
            sizes {
              ...GatsbyContentfulSizes_withWebp_noBase64
            }
            file {
              contentType
              url
            }
          }
        }
      }
    }
  }
`;
