import React from "react"
import BaseTemplate from "./baseTemplate";
import Img from "gatsby-image"
import TeaserAnimation from "../components/teaserAnimation"
import styles from "../pages/index.module.scss"

class PostTemplate extends BaseTemplate {

  renderImages(postImages, images) {
    if (!postImages) {
      return
    }

    return postImages.map((row, keyRow) => {

      const inlineStyles = {

      }

      return (
        <div key={keyRow} className={styles.row} style={inlineStyles}>
          {row.rowImages.map((col, keyCol) => {

            const inlineStyles = {

            }

            return (
              <div key={keyCol} className={styles.col} style={inlineStyles}>
                <TeaserAnimation>
                  <Img sizes={this.getImageSizes(col.image, images).sizes} />
                </TeaserAnimation>
              </div>
            )
          })}
        </div>
      )
    })
  }

  render() {

    const { markdownRemark, headerImage, images } = this.props.data;
    const { frontmatter } = markdownRemark

    return (
      <div className={styles.singlePost}>
        <div className={styles.posts + ' ' + styles.sticky}>
          <div className={styles.row}>
            <div className={styles.col}>
              <TeaserAnimation>
                <Img sizes={headerImage.sizes} />
              </TeaserAnimation>
            </div>
          </div>
        </div>
        <div className={styles.posts}>
          {this.renderImages(frontmatter.row, images)}
        </div>
      </div>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query PostByPath($slug: String!, $headerImage: String!, $images: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        location
        width
        marginTop
        row {
          verticalPosition
          rowImages {
            image
          }
        }
      }
    }
    headerImage: imageSharp(id: { regex: $headerImage }) {
      sizes(maxWidth: 900) {
        ...GatsbyImageSharpSizes
      }
    }
    images: allImageSharp(filter: {id: { regex: $images } }) {
      edges {
        node {
          id
          sizes(maxWidth: 900) {
            ...GatsbyImageSharpSizes
          }
        }
      }
    }
  }
`;
