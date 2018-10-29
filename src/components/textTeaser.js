import React from 'react'
import PostCol from "../components/postCol"
import { graphql } from 'gatsby'

import styles from '../pages/index.module.scss'

const TextTeaser = ({ post, odd, nrCols }) => (
  <PostCol post={post} odd={odd} nrCols={nrCols}>
    <div className={styles.textContainer} dangerouslySetInnerHTML={{__html: post.longText.childMarkdownRemark.html}} />
  </PostCol>
)

export default TextTeaser

export const query = graphql`
  fragment TextTeaser on ContentfulTextTeaser {
    verticalPosition
    width
    indentLeft
    indentRight
    longText {
      childMarkdownRemark {
        html
      }
    }
  }
`
