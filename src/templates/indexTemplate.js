import React from "react"
import Helmet from "react-helmet"
import BaseTemplate from "./baseTemplate"
import Teaser from "../components/teaser"
import styles from "../pages/index.module.scss"

class IndexTemplate extends BaseTemplate {

  renderPosts(teasers, teaserImages) {
    let isOdd = true

    return teasers.map((row, keyRow) => {

      const inlineStyles = {
        marginTop: row.marginTop
      }

      return (
        <div key={keyRow} className={styles.row} style={inlineStyles}>
          {row.cols.map((col, keyCol) => {
            isOdd = !isOdd
            return <Teaser isOdd={isOdd} keyRow={keyRow} key={keyCol} teaser={col} img={this.getImageSizes(col.thumbnail, teaserImages)} />
          })}
        </div>
      )
    })
  }

  render() {
    const { cmsGeneratedPosts, stickyImage, teaserImages } = this.props.data
    const { sticky, teasers } = cmsGeneratedPosts

    return (
      <div>
        <Helmet defaultTitle={`Christian Brandes`} titleTemplate={`%s | Christian Brandes`}>
          <meta name="description" content="Christian Brandes - Photograph based in Hamburg" />
        </Helmet>
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
  query IndexByPath($thumbnail: String!, $teasers: String!) {
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
          paddingLeft
          paddingRight
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
