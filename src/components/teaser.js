import React from "react"
import styles from "../pages/index.module.scss"

class Sticky extends React.Component {

  render() {
    const { teaser } = this.props
    const date = new Date(teaser.date)

    return (
      <figure>
        <img src={teaser.thumbnail} alt="" />
        <figcaption>
          <h1>{teaser.title}</h1>
          <p>{teaser.location},&nbsp;{date.toLocaleString('en-us', { month: 'long' })}&nbsp;{date.getFullYear()}</p>
        </figcaption>
      </figure>
    )
  }

}

export default Sticky
