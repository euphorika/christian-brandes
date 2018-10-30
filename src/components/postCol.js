import React from "react"
import TeaserAnimation from "../components/teaserAnimation"
import Helmet from 'react-helmet'
import Hash from 'object-hash'

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

    const styleHash = Hash({
      inlineStyles,
      indentStyles
    })
    const colIdentifier = styles.col + '-' + styleHash

    return (
      <div className={styles.col + ' ' + colIdentifier}>
        <Helmet>
          <style type="text/css">{`
            .${styles.posts}
            .${styles.row}
            .${styles.col}.${colIdentifier} {
              flex: 0.7;
            }

            @media only screen and (min-width: 667px) {
              .${styles.posts}
              .${styles.row}
              .${styles.col}.${colIdentifier} {
                flex: ${inlineStyles.flex};
                margin-top: ${inlineStyles.marginTop};
              }

              .${styles.posts}
              .${styles.row}
              .${styles.col}.${colIdentifier} > div {
                padding-left: ${indentStyles.paddingLeft};
                padding-right: ${indentStyles.paddingRight};
              }
            }
          `}</style>
        </Helmet>
        <div className={odd ? styles.odd : styles.even}>
          <TeaserAnimation>
            {children}
          </TeaserAnimation>
        </div>
      </div>
    )
  }

}

export default PostCol
