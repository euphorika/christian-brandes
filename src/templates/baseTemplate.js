import React from 'react'

class BaseTemplate extends React.Component {

  getImageSizes(thumbnail, images) {
    return images.edges.find(edge => edge.node.id.includes(thumbnail)).node
  }

}

export default BaseTemplate
