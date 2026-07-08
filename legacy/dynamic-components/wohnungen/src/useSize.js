import React from 'react'
import { mediaQueries } from '@project-r/styleguide'

export const DEFAULT_SIZE = {
  width: 1024,
  height: 768,
  mobile: false
}

function getSize(el) {
  const bbox = el.getBoundingClientRect()
  
  return {
    width: bbox.width,
    height: bbox.height,
    mobile: bbox.width < mediaQueries.mBreakPoint
  }
}

function useSize(ref) {
  const [size, setSize] = React.useState(DEFAULT_SIZE)
  const handleResize = React.useCallback(
    function handleResize() {
      if (ref.current) {
        setSize(getSize(ref.current))
      } else {
        setSize(DEFAULT_SIZE)
      }
      
    },
    [ref.current]
  )
  React.useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return function() {
      window.removeEventListener('resize', handleResize)
    }
  }, [ref.current])

  return size
}

export default useSize
