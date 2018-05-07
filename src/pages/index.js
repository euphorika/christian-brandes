import React from "react"
import styles from "./index.module.scss"

class Index extends React.Component {

  render() {
    const { markdownRemark } = this.props.data

    return (
      <div>
        <h1>{markdownRemark.frontmatter.title}</h1>
        <div className={styles.posts + ' ' + styles.sticky}>
          <div className={styles.row}>
            <figure>
              <img src="/assets/cb-placeholder-1.jpg" alt="" />
              <figcaption>
                <h1>Rooftop Basketball</h1>
                <p>Barcelona, June 2016</p>
              </figcaption>
            </figure>
          </div>
        </div>
        <div className={styles.posts}>
          <div className={styles.row + ' ' + styles.twoCols}>
            <div className={styles.col}>
              <figure>
                <img src="/assets/cb-placeholder-5.jpg" alt="" />
                <figcaption>
                  <h1>Rooftop Basketball</h1>
                  <p>Barcelona, June 2016</p>
                </figcaption>
              </figure>
            </div>
            <div className={styles.col}>
              <figure>
                <img src="/assets/cb-placeholder-6.jpg" alt="" />
                <figcaption>
                  <h1>Rooftop Basketball</h1>
                  <p>Barcelona, June 2016</p>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className={styles.row}>
            <figure>
              <img src="/assets/cb-placeholder-8.jpg" alt="" />
              <figcaption>
                <h1>Rooftop Basketball</h1>
                <p>Barcelona, June 2016</p>
              </figcaption>
            </figure>
          </div>
          <div className={styles.row}>
            <figure>
              <img src="/assets/cb-placeholder-9.jpg" alt="" />
              <figcaption>
                <h1>Rooftop Basketball</h1>
                <p>Barcelona, June 2016</p>
              </figcaption>
            </figure>
          </div>
          <div className={styles.row}>
            <figure>
              <img src="/assets/cb-placeholder-10.jpg" alt="" />
              <figcaption>
                <h1>Rooftop Basketball</h1>
                <p>Barcelona, June 2016</p>
              </figcaption>
            </figure>
          </div>
          <div className={styles.row}>
            <figure>
              <img src="/assets/cb-placeholder-11.jpg" alt="" />
              <figcaption>
                <h1>Rooftop Basketball</h1>
                <p>Barcelona, June 2016</p>
              </figcaption>
            </figure>
          </div>
          <div className={styles.row}>
            <figure>
              <img src="/assets/cb-placeholder-12.jpg" alt="" />
              <figcaption>
                <h1>Rooftop Basketball</h1>
                <p>Barcelona, June 2016</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    )
  }

}

export default Index

export const pageQuery = graphql`
  query HomeByPathIndex {
    markdownRemark(fields: { slug: { eq: "/" } }) {
      html
      frontmatter {
        title
        sticky
        root
      }
    }
  }
`;
