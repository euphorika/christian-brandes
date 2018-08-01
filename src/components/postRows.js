import React from "react"
import PostRow from "../components/postRow"

export default ( { rows } ) => {
  if (!rows) {
    return null
  }

  let isOdd = {
    value: true
  }

  return (
    <div>
      {rows.map((row, keyRow) => <PostRow key={keyRow} row={row} isOdd={isOdd} /> )}
    </div>
  )
}
