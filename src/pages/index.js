import React from "react"
import Sticky from "../components/sticky"
import Teaser from "../components/teaser"
import styles from "./index.module.scss"

class Index extends React.Component {

  renderPosts(teasers) {
    return (
      <div className={styles.row}>
        {teasers.map(teaser => {
          <Sticky teaser={teaser} />
        })}
      </div>
    )
  }

  render() {
    const { cmsGeneratedPosts } = this.props.data
    const { sticky, teasers } = cmsGeneratedPosts

    return (
      <div>
        <div className={styles.posts + ' ' + styles.sticky}>
          <Sticky teaser={sticky} />
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
  query HomeTeasers  {
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
        title
        location
        date
        meta_description
        thumbnail
        root
        row {
          rowImages {
            image
          }
        }
      }
  	}
  }
`;
