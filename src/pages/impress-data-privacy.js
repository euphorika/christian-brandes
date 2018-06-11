import React from "react"
import Lightbox from "../components/lightbox"
import Impress from "../components/impress"
import DataPrivacy from "../components/dataPrivacy"

export default () => (
  <Lightbox visible={true}>
    <Impress />
    <DataPrivacy />
  </Lightbox>
)
