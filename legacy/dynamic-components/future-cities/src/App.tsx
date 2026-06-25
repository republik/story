import * as React from 'react'

import { Center, Breakout, mediaQueries, useHeaderHeight } from '@project-r/styleguide'
import Story from './Story'
import { JOURNEYS } from './journeys'
import { PROFILES } from './profiles'
import ProfileSelector from './ProfileSelector'

type Props = {
  city?: string
  descriptions?: string[]
}

const App: React.FC<Props> = ({ city, descriptions }) => {
  const [ headerHeight ] = useHeaderHeight()
  const appRef = React.useRef<HTMLDivElement>(null)
  const [size, setSize] = React.useState<{
    width: number
    height: number
    headerHeight: number
    mobile: boolean
    margin: number
  }>({
    width: 375,
    height: 667,
    headerHeight: headerHeight,
    mobile: true,
    margin: 15,
  })

  const measure = () => {
    if (appRef.current) {
      const {
        width: bboxWidth,
      } = appRef.current.getBoundingClientRect()
      const width = Math.min(window.innerWidth, 1035)
      const margin = (width - bboxWidth) / 2
      const mobile = window.innerWidth < mediaQueries.mBreakPoint
      const height = window.innerHeight - headerHeight

      if (size && height < size.height && width === size.width) {
        return
      }

      setSize({
        width,
        height,
        mobile,
        headerHeight,
        margin,
      })
    }
  }

  React.useEffect(() => {
    measure()
  }, [])

  React.useEffect(() => {
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  })

  return (
    <div ref={appRef} style={{width: '100%'}}>
      {size && (
        <div
          style={{
            marginLeft: -size.margin,
            marginRight: -size.margin,
          }}
        >
          {city ? (
            <Story
              journey={JOURNEYS[city]}
              width={size.width}
              height={size.height}
              top={size.headerHeight}
              profile={PROFILES[city]}
              descriptions={descriptions}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: size.width,
                background: '#fff',
              }}
            >
              <ProfileSelector />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
