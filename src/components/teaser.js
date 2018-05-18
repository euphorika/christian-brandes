import React from "react"
import styles from "../pages/index.module.scss"

class Teaser extends React.Component {

  render() {
    const { teaser } = this.props
    const date = new Date(teaser.date)

    const inlineStyles = {
      marginTop: teaser.marginTop,
      width: teaser.width
    }

    return (
      <div className={styles.col} style={inlineStyles}>
        <figure>
          <img src={teaser.thumbnail} alt="" />
          <figcaption>
            <h2>{teaser.title}</h2>
            <p>{teaser.location},&nbsp;{date.toLocaleString('en-us', { month: 'long' })}&nbsp;{date.getFullYear()}</p>
          </figcaption>
        </figure>
      </div>
    )
  }

}

export default Teaser
