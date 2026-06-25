import React from 'react'

import { renderMdast } from 'mdast-react-render'
import visit from 'unist-util-visit'

import Frame from './Frame'

const Render = ({ mdast, schema }) => {
  const timelineUrl = require('file-loader!../../build/timeline.js')
  visit(mdast, 'zone', node => {
    if (node.identifier === 'DYNAMIC_COMPONENT' && node.data.src.match(/(dynamic-components)?\/[^\/]+\/timeline\.js/)) {
      node.data.src = '/build/timeline.js' +
        '?u=' + encodeURIComponent(timelineUrl)
    }
  })


  const indicatorsUrl = require('file-loader!../../build/indicators.js')
  visit(mdast, 'zone', node => {
    if (node.identifier === 'DYNAMIC_COMPONENT' && node.data.src.match(/(dynamic-components)?\/[^\/]+\/indicators\.js/)) {
      node.data.src = '/build/indicators.js' +
        '?u=' + encodeURIComponent(indicatorsUrl)
    }
  })

  const bannerUrl = require('file-loader!../../build/banner.js')
  visit(mdast, 'zone', node => {
    if (node.identifier === 'DYNAMIC_COMPONENT' && node.data.src.match(/(dynamic-components)?\/[^\/]+\/banner\.js/)) {
      node.data.src = '/build/banner.js' +
        '?u=' + encodeURIComponent(bannerUrl)
    }
  })

  const quotesUrl = require('file-loader!../../build/quotes.js')
  visit(mdast, 'zone', node => {
    if (node.identifier === 'DYNAMIC_COMPONENT' && node.data.src.match(/(dynamic-components)?\/[^\/]+\/quotes\.js/)) {
      node.data.src = '/build/quotes.js' +
        '?u=' + encodeURIComponent(quotesUrl)
    }
  })

  const dark =
    mdast &&
    mdast.meta &&
    mdast.meta.darkMode

  return <Frame dark={dark || true}>
    <div key={indicatorsUrl + timelineUrl + bannerUrl + quotesUrl}>
      {renderMdast(mdast, schema)}
    </div>
  </Frame>
}

export default Render