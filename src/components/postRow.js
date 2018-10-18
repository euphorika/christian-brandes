import React from "react"
import PostAsset from "../components/postAsset"
import PostVideoAsset from "../components/postVideoAsset"
import styles from "../pages/index.module.scss"
export default ( { row, isOdd = {} } ) => {

  const inlineStyles = {
    marginTop: row.verticalPosition ? row.verticalPosition : 0
  }

  switch(row.__typename)  {

    case 'ContentfulPostRow':
      return (
        <div className={styles.row} style={inlineStyles}>
          {row.postAsset.map((col, keyCol) => {
            isOdd.value = !isOdd.value

            if (col.__typename === 'ContentfulPostAsset') {
              return <PostAsset key={keyCol} post={col} odd={isOdd.value} nrCols={row.postAsset.length} />
            } else { // 'ContentfulPostVideo'
              return <PostVideoAsset key={keyCol} post={col} odd={isOdd.value} nrCols={row.postAsset.length} />
            }
          })}
        </div>
      )

    case 'ContentfulPostAsset':
      isOdd.value = !isOdd.value
      return (
        <div className={styles.row} style={inlineStyles}>
          <PostAsset post={row} odd={isOdd.value} nrCols={1} />
        </div>
      )

    case 'ContentfulPostVideo':
      isOdd.value = !isOdd.value
      return (
        <div className={styles.row} style={inlineStyles}>
          <PostVideoAsset post={row} odd={isOdd.value} nrCols={1} />
        </div>
      )

    default:
      return null
  }

}
