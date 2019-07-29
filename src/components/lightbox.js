import React from "react"
import { Link } from "gatsby"
import IconClose from "./icon-close"
import styles from "./lightbox.module.scss"

class Lightbox extends React.Component {

  constructor(props) {
    super(props)

    console.log(props)

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
        <div className={styles.lightboxInner}>
          <div className={styles.iconClose}>
            <Link to="/">
              <IconClose />
            </Link>
          </div>
          <div className={styles.lightboxChildrenContainer}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }

}

export default Lightbox
