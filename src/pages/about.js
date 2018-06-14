import React from "react"
import Helmet from "react-helmet"
import Lightbox from "../components/lightbox"
import AboutComponent from "../components/about"

const About = ({ transition }) => (
  <div style={transition && transition.style}>
    <Helmet>
      <title>About</title>
      <meta name="description" content="About - Christian Brandes" />
    </Helmet>
    <Lightbox visible={true}>
      <AboutComponent />
    </Lightbox>
  </div>
)

export default About
