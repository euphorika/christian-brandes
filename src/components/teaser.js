import React from "react"
import styles from "../pages/index.module.scss"

class Teaser extends React.Component {

  render() {
    const { teaser } = this.props
    const date = new Date(teaser.date)

    const styles = {
      marginTop: teaser.verticalPosition ? teaser.verticalPosition : 0,
      width: teaser.width ? teaser.width + '%' : 'auto'
    }

    return (
      <figure style={styles}>
        <img src={teaser.thumbnail} alt="" />
        <figcaption>
          <h2>{teaser.title}</h2>
          <p>{teaser.location},&nbsp;{date.toLocaleString('en-us', { month: 'long' })}&nbsp;{date.getFullYear()}</p>
        </figcaption>
      </figure>
    )
  }

}

export default Teaser
