import React from "react"
import TeaserAnimation from "../components/teaserAnimation"
import styles from "../pages/index.module.scss"

export default ({ vimeoCode }) => (
  <div className={styles.row}>
    <div className={styles.col}>
      <TeaserAnimation>
        <div className={styles.vimeoContainer}>
          <div dangerouslySetInnerHTML={{ __html: vimeoCode }} />
        </div>
      </TeaserAnimation>
    </div>
  </div>
)
