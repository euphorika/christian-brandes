import React from "react"
import Helmet from "react-helmet"
import Teaser from "../components/teaser"
import styles from "../pages/index.module.scss"
import { graphql } from 'gatsby'
import Layout from "../components/layout"

class IndexTemplate extends React.Component {

  renderPosts(posts) {
    let isOdd = true

    return posts.map((row, keyRow) => {

      const inlineStyles = {
        marginTop: row.rowVerticalPosition ? row.rowVerticalPosition : 0
      }

      return (
        <div key={keyRow} className={styles.row} style={inlineStyles}>
          {row.teasers.map((col, keyCol) => {
            isOdd = !isOdd
            col.nrCols = row.teasers.length

            return <Teaser isOdd={isOdd} keyRow={keyRow} key={keyCol} col={col} />
          })}
        </div>
      )
    })
  }

  render() {
    const { contentfulCategory } = this.props.data
    const { sticky, posts } = contentfulCategory

    const stickyTeaser = {
      teaser: sticky
    }

    return (
      <Layout>
        <Helmet defaultTitle={`Christian Brandes`} titleTemplate={`%s | Christian Brandes`}>
          <meta name="description" content={contentfulCategory.metaDescription} />
        </Helmet>
        <div className={styles.posts + ' ' + styles.sticky}>
          <div className={styles.row}>
            <Teaser col={stickyTeaser} img={sticky.featuredImage} />
          </div>
        </div>
        <div className={styles.posts}>
          {this.renderPosts(posts)}
        </div>
      </Layout>
    )
  }
}

export default IndexTemplate

export const pageQuery = graphql`
  query IndexByPath($slug: String!) {
    contentfulCategory(slug:{eq: $slug}) {
      metaDescription
      sticky {
        title
        slug
        location
        date
        featuredImage {
          title
          sizes(quality:90) {
            ...GatsbyContentfulSizes
          }
          file {
            contentType
            url
          }
        }
        videoFallback {
          sizes(quality:90) {
            src
          }
        }
      }
      posts {
        rowVerticalPosition
        teasers {
          __typename
          ... on ContentfulCategoryTeaser {
            width
            verticalPosition
            indentLeft
            indentRight
            teaser {
              title
              slug
              location
              date
              featuredImage {
                title
                sizes(quality:90) {
                  ...GatsbyContentfulSizes
                }
                file {
                  contentType
                  url
                }
              }
            }
          }
          ... on ContentfulDeadCategoryTeaser {
            title
            location
            date
            width
            verticalPosition
            indentLeft
            indentRight
            videoFallback {
              sizes(quality:90) {
                src
              }
            }
            asset {
              title
              sizes(quality:90) {
                ...GatsbyContentfulSizes
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
  }
`
