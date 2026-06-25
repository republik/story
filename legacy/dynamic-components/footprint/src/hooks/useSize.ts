import * as React from 'react'
import { RefObject } from 'react'
import { Size } from '../types'

import { mediaQueries, useHeaderHeight } from '@project-r/styleguide'
import { PADDING, PADDING_MOBILE } from '../constants'

export const DEFAULT_SIZE = {
  width: 375,
  height: 667,
  top: 0,
  padding: PADDING_MOBILE,
  mobile: true,
  headerHeight: 45 
}

function getSize(el: HTMLElement) {
  const mobile = window.innerWidth < mediaQueries.mBreakPoint
  const bbox = el.getBoundingClientRect()
  
  return {
    width: bbox.width,
    height: bbox.height,
    top: window.scrollY + bbox.top,
    padding: mobile ? PADDING_MOBILE : PADDING,
    mobile,
  }
}

function useSize(ref: RefObject<HTMLElement>): Size {
  const [ headerHeight ] = useHeaderHeight()
  const [size, setSize] = React.useState(DEFAULT_SIZE)
  const handleResize = React.useCallback(
    function handleResize() {
      if (ref.current) {
        setSize({...getSize(ref.current), headerHeight })
      }
    },
    [ref.current]
  )
  React.useLayoutEffect(() => {
    if (!ref.current) {
      return
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return function() {
      window.removeEventListener('resize', handleResize)
    }
  }, [ref.current])

  return size
}

export default useSize
