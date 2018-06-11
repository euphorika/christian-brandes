import React from "react"
import Lightbox from "../components/lightbox"
import AboutComponent from "../components/about"

const About = () => (
  <Lightbox visible={true}>
    <AboutComponent />
  </Lightbox>
)

export default About
