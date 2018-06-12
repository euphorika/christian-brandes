import React from "react"
import Lightbox from "../components/lightbox"
import AboutComponent from "../components/about"

const About = ({ transition }) => (
  <div style={transition && transition.style}>
    <Lightbox visible={true}>
      <AboutComponent />
    </Lightbox>
  </div>
)

export default About
