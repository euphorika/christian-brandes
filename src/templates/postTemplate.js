import React from "react";
import Img from "gatsby-image"
import styles from "../pages/index.module.scss"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {

  const { markdownRemark, headerImage, images } = data;
  const { frontmatter } = markdownRemark

  const getImageSizes = (thumbnail, images) => {
    return images.edges.find(edge => edge.node.id.includes(thumbnail)).node
  }

  const renderImages = postImages => {
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
                <Img sizes={getImageSizes(col.image, images).sizes} />
              </div>
            )
          })}
        </div>
      )
    })
  }

  return (
    <div className={styles.singlePost}>
      <div className={styles.posts + ' ' + styles.sticky}>
        <div className={styles.row}>
          <div className={styles.col}>
            <Img sizes={headerImage.sizes} />
          </div>
        </div>
      </div>
      <div className={styles.posts}>
        {renderImages(frontmatter.row)}
      </div>
    </div>
  )
}

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
