import React from "react"
import Helmet from "react-helmet"
import Lightbox from "../components/lightbox"
import Impress from "../components/impress"
import DataPrivacy from "../components/dataPrivacy"

export default ({ transition }) => (
  <div style={transition && transition.style}>
    <Helmet>
      <title>Impress</title>
      <meta name="description" content="Impress - Christian Brandes" />
    </Helmet>
    <Lightbox visible={true}>
      <Impress />
      <DataPrivacy />
    </Lightbox>
  </div>
)
