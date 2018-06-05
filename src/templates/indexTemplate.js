import React from "react";
import Teaser from "../components/teaser"
import styles from "../pages/index.module.scss"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { cmsGeneratedPosts, stickyImage, teaserImages } = data
  const { sticky, teasers } = cmsGeneratedPosts

  const renderPosts = teasers => {
    return teasers.map((row, keyRow) => {

      const inlineStyles = {
        marginTop: row.marginTop
      }

      return (
        <div key={keyRow} className={styles.row} style={inlineStyles}>
          {row.cols.map((col, keyCol) => <Teaser key={keyCol} teaser={col} img={teaserImages.edges[keyRow + keyCol].node} /> )}
        </div>
      )
    })
  }

  return (
    <div>
      <div className={styles.posts + ' ' + styles.sticky}>
        <div className={styles.row}>
          <Teaser teaser={sticky} img={stickyImage} />
        </div>
      </div>
      <div className={styles.posts}>
        {renderPosts(teasers)}
      </div>
    </div>
  );
}

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
          sizes(maxWidth: 900) {
            ...GatsbyImageSharpSizes
          }
        }
      }
    }
  }
`;
