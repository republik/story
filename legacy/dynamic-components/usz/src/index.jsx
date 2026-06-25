import React, { useState, useEffect, useRef, useMemo } from 'react'
import { css } from 'glamor'
import {
  useColorContext,
  plainButtonRule,
  Center,
  useHeaderHeight,
  Editorial,
  mediaQueries,
} from '@project-r/styleguide'
import { MdAccessTime } from '@react-icons/all-files/md/MdAccessTime'
import { IoIosPeople as People } from '@react-icons/all-files/io/IoIosPeople'

import CastOverlay, { normalizeAnchor } from './Cast'
import TimelineOverlay from './Timeline'

// dotted as border bottom looks better because it's not glued to the text
const specialLinkStyle = {
  textDecoration: 'none',
  borderBottomWidth: '1px',
  borderBottomStyle: 'dotted',
}

const styles = {
  stickyBox: css({
    position: 'fixed',
    right: 16,
    display: 'flex',
    zIndex: 1,
    margin: 0,
    marginTop: 16,
    [mediaQueries.mUp]: {
      marginRight: 16,
    },
  }),
  stickyButton: css({
    padding: 4,
    height: 44,
    marginLeft: 16,
  }),
  overlayButton: css({
    padding: '8px 8px 8px 0px',
    width: '100%',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'flex-start',
  }),
}

const Index = ({ timeline, cast, corrective }) => {
  const [colorScheme] = useColorContext()
  const headerHeight = useHeaderHeight()
  const [openOverlay, setOpenOverlay] = useState()
  const [selectedCast, setSelectedCast] = useState()
  const [isSticky, setSticky] = useState(false)
  const [stickyRefHeight, setStickyRefHeight] = useState(0)
  const stickyref = useRef(null)

  const handleScroll = () => {
    if (stickyref.current) {
      setSticky(stickyref.current.getBoundingClientRect().top <= 0)
      setStickyRefHeight(stickyref.current.clientHeight)
    }
  }
  const handleResize = () => {
    setStickyRefHeight(stickyref.current.clientHeight)
  }
  // Link klick capture for name press
  useEffect(() => {
    const links = document.getElementsByTagName('a')
    const namelinks = Array.from(links).filter((link) =>
      link.href.includes('namelink')
    )
    const onClick = (e) => {
      e.preventDefault()
      setSelectedCast(normalizeAnchor(e.target.hash))
      setOpenOverlay('cast')
    }
    for (const i in namelinks) {
      if (namelinks[i]) {
        Object.keys(specialLinkStyle).forEach((key) => {
          namelinks[i].style[key] = specialLinkStyle[key]
        })

        namelinks[i].addEventListener('click', onClick)
      }
    }
    handleResize()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      for (const i in namelinks) {
        if (namelinks[i]) {
          Object.keys(specialLinkStyle).forEach((key) => {
            namelinks[i].style[key] = ''
          })
          namelinks[i].removeEventListener('click', onClick)
        }
      }
    }
  }, [])
  return (
    <>
      <button
        {...styles.overlayButton}
        {...plainButtonRule}
        style={{ marginBottom: 8 }}
        onClick={() => {
          setSelectedCast(undefined)
          setOpenOverlay('cast')
        }}
      >
        <div style={{ padding: 4 }}>
          <People size={36} {...colorScheme.set('fill', 'text')} />
        </div>
        <div style={{ flex: 1, padding: 4 }}>
          <Editorial.Subhead style={{ margin: 0 }}>
            Die Protagonisten
          </Editorial.Subhead>
          <Editorial.P>
            Klicken Sie auf die <span style={specialLinkStyle}>Namen</span>, um
            Details zur Person zu erfahren.
          </Editorial.P>
        </div>
      </button>
      <div ref={stickyref} style={{ minHeight: stickyRefHeight }}>
        <button
          {...plainButtonRule}
          {...styles.overlayButton}
          onClick={() => setOpenOverlay('timeline')}
        >
          <div style={{ padding: 4 }}>
            <MdAccessTime size={36} {...colorScheme.set('fill', 'text')} />
          </div>
          <div style={{ flex: 1, padding: 4 }}>
            <Editorial.Subhead style={{ margin: 0 }}>
              Chronologie
            </Editorial.Subhead>
            <Editorial.P>Eine Chronologie der Ereignisse.</Editorial.P>
          </div>
        </button>
      </div>
      {isSticky && (
        <div {...styles.stickyBox} style={{ top: headerHeight }}>
          <button
            {...plainButtonRule}
            {...styles.stickyButton}
            {...colorScheme.set('backgroundColor', 'overlay')}
            {...colorScheme.set('boxShadow', 'overlayShadow')}
            onClick={() => setOpenOverlay('timeline')}
          >
            <MdAccessTime size={36} {...colorScheme.set('fill', 'text')} />
          </button>
          <button
            {...plainButtonRule}
            {...styles.stickyButton}
            {...colorScheme.set('backgroundColor', 'overlay')}
            {...colorScheme.set('boxShadow', 'overlayShadow')}
            onClick={() => {
              setSelectedCast(undefined)
              setOpenOverlay('cast')
            }}
          >
            <People size={36} {...colorScheme.set('fill', 'text')} />
          </button>
        </div>
      )}

      {openOverlay === 'cast' ? (
        <CastOverlay
          selectedCast={selectedCast}
          cast={cast}
          onClose={() => setOpenOverlay('')}
        />
      ) : openOverlay === 'timeline' ? (
        <TimelineOverlay
          onClose={() => setOpenOverlay('')}
          timeline={timeline}
          corrective={corrective}
        />
      ) : null}
    </>
  )
}

export default Index
