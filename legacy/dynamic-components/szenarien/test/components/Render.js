import React from 'react'

import { renderMdast } from 'mdast-react-render'
import visit from 'unist-util-visit'

import Frame from './Frame'

const Render = ({ mdast, schema }) => {
  const indexUrl = require('file-loader!../../build/index.js')
  const y2020Url = require('file-loader!../../build/y2020.js')

  visit(mdast, 'zone', node => {
    if (node.identifier === 'DYNAMIC_COMPONENT' && node.data.src.match(/dynamic-components\/[^\/]+\/index\.js/)) {
      node.data.src = '/build/index.js' +
        '?u=' + encodeURIComponent(indexUrl)
    }
    if (node.identifier === 'DYNAMIC_COMPONENT' && node.data.src.match(/dynamic-components\/[^\/]+\/y2020\.js/)) {
      node.data.src = '/build/y2020.js' +
        '?u=' + encodeURIComponent(y2020Url)
    }
  })

  const dark =
    mdast &&
    mdast.meta &&
    mdast.meta.darkMode

  return <Frame dark={dark}>
    <div key={indexUrl + y2020Url}>
      {renderMdast(mdast, schema)}
    </div>
  </Frame>
}

export default Render
