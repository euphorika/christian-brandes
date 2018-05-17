import React from "react"
import Teaser from "../components/teaser"
import styles from "./index.module.scss"

class Index extends React.Component {

  renderPosts(teasers) {
    return teasers.map((row, key) => {
      return (
        <div key={key} className={styles.row}>
          {row.map((col, key) => {
            return (
              <div key={key} className={styles.col}>
                <Teaser teaser={col} />
              </div>
            )
          })}
        </div>
      )
    })
  }

  render() {
    const { cmsGeneratedPosts } = this.props.data
    const { sticky, teasers } = cmsGeneratedPosts

    return (
      <div>
        <div className={styles.posts + ' ' + styles.sticky}>
          <div className={styles.row}>
            <Teaser teaser={sticky} />
          </div>
        </div>
        <div className={styles.posts}>
          {this.renderPosts(teasers)}
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
      }
  	}
  }
`;
