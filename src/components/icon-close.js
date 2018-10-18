import React from "react"

export default () => (
  <div style={ {cursor: 'pointer'} }  onClick={ () => window.history.back() }>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
      <path d="M458.4 393.5L314.9 250.1l143.5-143.5-65-64.9-143.5 143.4L106.5 41.7l-65 64.9L185 250.1 41.5 393.5l65 65L249.9 315l143.5 143.5z"/>
    </svg>
  </div>
)
