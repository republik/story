import React from 'react'

import { renderMdast } from 'mdast-react-render'
import visit from 'unist-util-visit'

const Render = ({ mdast, schema }) => {
  const indexUrl = require('file-loader!../../build/index.js')
  const collageUrl = require('file-loader!../../build/collage.js')

  visit(mdast, 'zone', node => {
    if (node.identifier === 'DYNAMIC_COMPONENT' && node.data.src.match(/dynamic-components\/[^\/]+\/index\.js/)) {
      node.data.src = '/build/index.js' +
        '?u=' + encodeURIComponent(indexUrl)
    }
    if (node.identifier === 'DYNAMIC_COMPONENT' && node.data.src.match(/dynamic-components\/[^\/]+\/collage\.js/)) {
      node.data.src = '/build/collage.js' +
        '?u=' + encodeURIComponent(collageUrl)
    }
  })

  return <div key={indexUrl + collageUrl}>
    {renderMdast(mdast, schema)}
  </div>
}

export default Render
