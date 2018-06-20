import React from "react"
import Helmet from "react-helmet"
import BaseTemplate from "./baseTemplate"
import Teaser from "../components/teaser"
import styles from "../pages/index.module.scss"

class IndexTemplate extends BaseTemplate {

  renderPosts(posts) {
    let isOdd = true

    return posts.map((row, keyRow) => {

      const inlineStyles = {
        marginTop: row.marginTop ? marginTop: 0
      }

      return (
        <div key={keyRow} className={styles.row} style={inlineStyles}>
          {row.teasers.map((col, keyCol) => {
            isOdd = !isOdd
            return <Teaser isOdd={isOdd} keyRow={keyRow} key={keyCol} teaser={col} img={col.featuredImage} />
          })}
        </div>
      )
    })
  }

  render() {
    const { contentfulCategory } = this.props.data
    const { sticky } = contentfulCategory
    const { posts } = contentfulCategory

    return (
      <div>
        <Helmet defaultTitle={`Christian Brandes`} titleTemplate={`%s | Christian Brandes`}>
          <meta name="description" content="Christian Brandes - Photograph based in Hamburg" />
        </Helmet>
        <div className={styles.posts + ' ' + styles.sticky}>
          <div className={styles.row}>
            <Teaser teaser={sticky} img={sticky.featuredImage} />
          </div>
        </div>
        <div className={styles.posts}>
          {this.renderPosts(posts)}
        </div>
      </div>
    );
  }

}

export default IndexTemplate

export const pageQuery = graphql`
  query IndexByPath($slug: String!) {
    contentfulCategory(slug:{eq: $slug}) {
      sticky {
        title
        location
        date
        featuredImage {
          sizes {
            base64
            tracedSVG
            aspectRatio
            src
            srcSet
            srcWebp
            srcSetWebp
            sizes
          }
        }
      }
      posts {
        teasers {
          title
          location
          date
          featuredImage {
            sizes {
              base64
              tracedSVG
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
      }
   	}
  }
`;
