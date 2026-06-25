import React from 'react'

import { renderMdast } from 'mdast-react-render'
import visit from 'unist-util-visit'

const Render = ({ mdast, schema }) => {
  return <div>
    {renderMdast(mdast, schema)}
  </div>
}

export default Render
