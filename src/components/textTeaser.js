import React from 'react'
import PostCol from "../components/postCol"
import { graphql } from 'gatsby'

class TextTeaser extends React.Component {

  _renderRichText(element, key) {
    switch(element.nodeType) {
      case 'heading-1':
        return this._renderHeadline1(element.content[0].value, key)

      case 'heading-2':
        return this._renderHeadline2(element.content[0].value, key)

      case 'paragraph':
      default:
        return this._renderParagraph(element.content[0].value, key)
    }
  }

  _renderHeadline1(content, key) {
    return <h1 key={key}>{content}</h1>
  }

  _renderHeadline2(content, key) {
    return <h2 key={key}>{content}</h2>
  }

  _renderParagraph(content, key) {
    return <p key={key}>{content}</p>
  }

  render() {
    const { post, odd, nrCols } = this.props

    return (
      <PostCol post={post} odd={odd} nrCols={nrCols}>
        {post.text.content.map((element, key) => this._renderRichText(element, key))}
      </PostCol>
    )
  }

}

export default TextTeaser

export const query = graphql`
  fragment TextTeaser on ContentfulTextTeaser {
    text {
      content {
        nodeType
        content {
          value
          nodeType
        }
      }
    }
  }
`
