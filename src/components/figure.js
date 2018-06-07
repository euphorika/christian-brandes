import React from "react"
import Img from "gatsby-image"

class Figure extends React.Component {

  render() {

    const { teaser, img } = this.props
    const date = new Date(teaser.date)

    return (
      <figure>
        <Img sizes={img.sizes} />
        <figcaption>
          <h2>{teaser.title}</h2>
          <p>{teaser.location},&nbsp;{date.toLocaleString('en-us', { month: 'long' })}&nbsp;{date.getFullYear()}</p>
        </figcaption>
      </figure>
    )
  }

}

export default Figure
