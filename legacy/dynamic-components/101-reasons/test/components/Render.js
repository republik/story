import React from 'react'

import { renderMdast } from 'mdast-react-render'
import visit from 'unist-util-visit'
import { ColorContextProvider } from '@project-r/styleguide'

const Render = ({ mdast, schema }) => {
  const indexUrl = require('file-loader!../../build/index.js')
  const shareUrl = require('file-loader!../../build/share.js')

  visit(mdast, 'zone', (node) => {
    if (
      node.identifier === 'DYNAMIC_COMPONENT' &&
      node.data.src.match(/dynamic-components\/[^\/]+\/index\.js/)
    ) {
      node.data.src = '/build/index.js' + '?u=' + encodeURIComponent(indexUrl)
    } else if (
      node.identifier === 'DYNAMIC_COMPONENT' &&
      node.data.src.match(/dynamic-components\/[^\/]+\/share\.js/)
    ) {
      node.data.src = '/build/share.js' + '?u=' + encodeURIComponent(shareUrl)
    }
  })

  return (
    <ColorContextProvider root colorSchemeKey='auto'>
      <div key={indexUrl}>{renderMdast(mdast, schema)}</div>
    </ColorContextProvider>
  )
}

export default Render
