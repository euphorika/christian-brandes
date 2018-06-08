import React from "react"
import Waypoint from "react-waypoint"

import styles from "./teaserAnimation.module.scss"

class TeaserAnimation extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      animationDirection: null,
      offset: '15%'
    }

    this.onEnter = this.onEnter.bind(this)
    this.onLeave = this.onLeave.bind(this)
  }

  onEnter({ currentPosition }) {
    this.setState({
      animationDirection: null
    })
  }

  onLeave({ currentPosition }) {
    switch(currentPosition) {
      case Waypoint.above:
        this.setState({
          animationDirection: 'up'
        })
        break;
      case Waypoint.below:
        this.setState({
          animationDirection: 'down'
        })
        break;
      default:
        this.setState({
          animationDirection: null
        })
    }
  }

  render() {

    const animationClass = this.state.animationDirection
                             ? this.state.animationDirection === 'up' ? styles.animateUp : styles.animationDown
                             : null

    return (
      <Waypoint onEnter={this.onEnter} onLeave={this.onLeave} topOffset={this.state.offset} bottomOffset={this.state.offset}>
        <div className={styles.animate + ' ' + animationClass}>
          {this.props.children}
        </div>
      </Waypoint>
    )
  }

}

export default TeaserAnimation
