import scrollIntoView from 'scroll-into-view'

export const shouldIgnoreClick = event => {
  // source https://github.com/zeit/next.js/blob/82d56e063aad12ac8fee5b9d5ed24ccf725b1a5b/packages/next-server/lib/link.js#L59
  const { nodeName, target } = event.currentTarget
  return (
    nodeName === 'A' &&
    !!(
      (target && target !== '_self') ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      (event.nativeEvent && event.nativeEvent.which === 2)
    )
  )
}

export const createOnSlugClick = href => e => {
  if (shouldIgnoreClick(e) || !href) {
    return
  }
  const ele = document.getElementById(href.substr(1))
  if (ele) {
    e.preventDefault()
    scrollIntoView(ele, { time: 400, align: { top: 0 } })
  }
}
