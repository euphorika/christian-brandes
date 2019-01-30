import React from "react"
import PostAsset from "../components/postAsset"
import PostVideoAsset from "../components/postVideoAsset"
import PostVimeoVideo from "../components/PostVimeoVideo"
import TextTeaser from '../components/textTeaser'
import Helmet from 'react-helmet'
import Hash from 'object-hash'

import styles from "../pages/index.module.scss"

export default ( { row, isOdd = {} } ) => {

  const inlineStyles = {
    marginTop: row.verticalPosition ? row.verticalPosition : 0
  }

  const styleHash = Hash(inlineStyles)
  const stepIdentifier = row.flat ? '' : ' ' + styles.steps
  const rowIdentifier = styles.row + ' ' + styleHash

  const helmet = <Helmet>
    <style type="text/css">{`
      .${styles.row}.${rowIdentifier} {
        margin-top: ${inlineStyles.marginTop};
      }
    `}</style>
  </Helmet>

  switch(row.__typename)  {

    case 'ContentfulPostRow':
      return (
        <div className={styles.row + stepIdentifier + ' ' + rowIdentifier}>
          {helmet}
          {row.postAsset.map((col, keyCol) => {
            isOdd.value = !isOdd.value

            if (col.__typename === 'ContentfulPostAsset') {
              return <PostAsset key={keyCol} post={col} odd={isOdd.value} nrCols={row.postAsset.length} />
            } else if (col.__typename === 'ContentfulPostVimeoVideo') {
              return <PostVimeoVideo key={keyCol} post={col} odd={isOdd.value} nrCols={row.postAsset.ength} />
            } else { // 'ContentfulPostVideo'
              return <PostVideoAsset key={keyCol} post={col} odd={isOdd.value} nrCols={row.postAsset.length} />
            }
          })}
        </div>
      )

    case 'ContentfulPostAsset':
      isOdd.value = !isOdd.value
      return (
        <div className={styles.row + ' ' + rowIdentifier}>
          {helmet}
          <PostAsset post={row} odd={isOdd.value} nrCols={1} />
        </div>
      )

    case 'ContentfulPostVideo':
      isOdd.value = !isOdd.value
      return (
        <div className={styles.row + ' ' + rowIdentifier}>
          {helmet}
          <PostVideoAsset post={row} odd={isOdd.value} nrCols={1} />
        </div>
      )

    case 'ContentfulPostVimeoVideo':
      isOdd.value = !isOdd.value
      return (
        <div className={styles.row + ' ' + rowIdentifier}>
          {helmet}
          <PostVimeoVideo post={row} odd={isOdd.value} nrCols={1} />
        </div>
      )

    case 'ContentfulTextTeaser':
      isOdd.value = !isOdd.value
      return (
        <div className={styles.row + ' ' + rowIdentifier}>
          {helmet}
          <TextTeaser post={row} odd={isOdd.value} nrCols={1} />
        </div>
      )

    default:
      return null
  }

}
