import React from "react"
import Img from "gatsby-image"

class Figure extends React.Component {

  _renderTitle(title) {
    if (!title) {
      return
    }

    return <h2>{title}</h2>
  }

  _renderLocation(location, date) {
    if (!location && !date) {
      return
    }

    if (!location) {
      return <p>{date.toLocaleString('en-us', { month: 'long' })}&nbsp;{date.getFullYear()}</p>
    }

    if (!date) {
      return <p>{location}</p>
    }

    return <p>{location},&nbsp;{date.toLocaleString('en-us', { month: 'long' })}&nbsp;{date.getFullYear()}</p>
  }

  render() {

    const { teaser } = this.props
    const date = teaser.date && new Date(teaser.date)

    return (
      <figure>
        <Img sizes={teaser.featuredImage.sizes} alt={teaser.featuredImage.title} />
        <figcaption>
          {this._renderTitle(teaser.title)}
          {this._renderLocation(teaser.location, date)}
        </figcaption>
      </figure>
    )
  }

}

export default Figure
