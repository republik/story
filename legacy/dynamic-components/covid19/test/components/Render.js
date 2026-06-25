import React from 'react'

import { renderMdast } from 'mdast-react-render'
import visit from 'unist-util-visit'

import Frame from './Frame'

const Render = ({ mdast, schema }) => {
  const extrapolationUrl = require('file-loader!../../build/extrapolation.js')

  visit(mdast, 'zone', node => {
    if (node.identifier === 'DYNAMIC_COMPONENT' && node.data.src.match(/dynamic-components\/[^\/]+\/extrapolation\.js/)) {
      node.data.src = '/build/extrapolation.js' +
        '?u=' + encodeURIComponent(extrapolationUrl)
    }
  })

  const dark =
    mdast &&
    mdast.meta &&
    mdast.meta.darkMode

  return <Frame dark={dark}>
    <div key={extrapolationUrl}>
      {renderMdast(mdast, schema)}
    </div>
  </Frame>
}

export default Render
