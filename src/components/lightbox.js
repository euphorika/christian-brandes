import React from "react"
import styles from "./lightbox.module.scss"

class Lightbox extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      visible: this.props.visible
    }
  }

  render() {
    const toggleVisibility = {
      display: this.state.visible ? 'block' : 'none'
    }

    return (
      <div style={toggleVisibility} className={styles.lightboxContainer}>
        {this.props.children}
      </div>
    )
  }

}

export default Lightbox
