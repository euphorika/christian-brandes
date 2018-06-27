import React from "react"
import TeaserAnimation from "../components/teaserAnimation"
import styles from "../pages/index.module.scss"

class PostCol extends React.Component {

  render() {

    const { post, odd, nrCols, children } = this.props

    const inlineStyles = {
      flex: post.width ? post.width / 100 : nrCols === 1 ? 0.7 : 1,
      marginTop: post.verticalPosition ? post.verticalPosition : '0',
    }

    const indentStyles = {
      paddingLeft: post.indentLeft ? post.indentLeft : 0,
      paddingRight: post.indentRight ? post.indentRight : 0
    }

    return (
      <div className={styles.col} style={inlineStyles}>
        <div className={odd ? styles.odd : styles.even} style={indentStyles}>
          <TeaserAnimation>
            {children}
          </TeaserAnimation>
        </div>
      </div>
    )
  }

}

export default PostCol
