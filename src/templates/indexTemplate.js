import React from "react"
import BaseTemplate from "./baseTemplate"
import Teaser from "../components/teaser"
import styles from "../pages/index.module.scss"

class IndexTemplate extends BaseTemplate {

  renderPosts(teasers, teaserImages) {
    return teasers.map((row, keyRow) => {

      const inlineStyles = {
        marginTop: row.marginTop
      }

      return (
        <div key={keyRow} className={styles.row} style={inlineStyles}>
          {row.cols.map((col, keyCol) => <Teaser key={keyCol} teaser={col} img={this.getImageSizes(col.thumbnail, teaserImages)} /> )}
        </div>
      )
    })
  }

  render() {
    const { cmsGeneratedPosts, stickyImage, teaserImages } = this.props.data
    const { sticky, teasers } = cmsGeneratedPosts

    return (
      <div>
        <div className={styles.posts + ' ' + styles.sticky}>
          <div className={styles.row}>
            <Teaser teaser={sticky} img={stickyImage} />
          </div>
        </div>
        <div className={styles.posts}>
          {this.renderPosts(teasers, teaserImages)}
        </div>
      </div>
    );
  }

}

export default IndexTemplate

export const pageQuery = graphql`
  query IndexByPath($slug: String!, $thumbnail: String!, $teasers: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
    cmsGeneratedPosts {
      sticky {
        title
        date
        location
        meta_description
        thumbnail
        slug
        root
      }
      teasers {
        marginTop
        cols {
          title
          location
          date
          meta_description
          thumbnail
          root
          width
          marginTop
          slug
        }
      }
    }
    stickyImage: imageSharp(id: { regex: $thumbnail }) {
      sizes(maxWidth: 900) {
        ...GatsbyImageSharpSizes
      }
    }
    teaserImages: allImageSharp(filter: {id:{ regex: $teasers } } ) {
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
