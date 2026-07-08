import React, { useEffect, useMemo } from 'react'
import { css } from 'glamor'
import {
  Overlay,
  OverlayBody,
  plainButtonRule,
  Editorial,
  useColorContext,
  mediaQueries,
  RawHtml,
} from '@project-r/styleguide'
import { MdClose } from '@react-icons/all-files/md/MdClose'

const styles = {
  closeButton: css({
    position: 'absolute',
    padding: 8,
    top: 0,
    right: 0,
  }),
  closeButtonFixed: css({
    position: 'fixed',
    padding: 8,
    top: 0,
    right: 0,
    zIndex: 1,
    [mediaQueries.mUp]: {
      display: 'none',
    },
  }),
  castBox: css({
    marginTop: 36,
    display: 'flex',
    alignItems: 'flex-start',
  }),
  selectedCast: css({
    padding: 8,
  }),
}

export function normalizeAnchor(anchor) {
  // URI decode, and strip all chars but digits and A-Z.
  return decodeURIComponent(anchor)
    .replace(/[^0-9a-z]/gi, '')
    .toLowerCase()
}

const Cast = ({ cast, onClose, selectedCast }) => {
  useEffect(() => {
    if (selectedCast) {
      const el = document.getElementById(selectedCast)

      if (el) {
        el.scrollIntoView()
      }
    }
  }, [])
  const [colorScheme] = useColorContext()

  return (
    <Overlay
      mUpStyle={{ width: '80%', maxWidth: 720, maxHeight: 'none' }}
      onClose={onClose}
    >
      <button {...styles.closeButton} {...plainButtonRule} onClick={onClose}>
        <MdClose size={32} />
      </button>

      <OverlayBody>
        <button
          {...styles.closeButtonFixed}
          {...plainButtonRule}
          {...colorScheme.set('backgroundColor', 'overlay')}
          onClick={onClose}
        >
          <MdClose size={32} />
        </button>
        <Editorial.Headline>Die Protagonisten</Editorial.Headline>
        {cast.map((person, j) => {
          const namehash = normalizeAnchor(person.name)
          const rawHTMLRule = useMemo(
            () =>
              css({
                '& p, h2': {
                  color: colorScheme.getCSSColor(
                    selectedCast === namehash ? 'default' : 'text'
                  ),
                },
              }),
            [colorScheme, namehash]
          )
          const imageSrc = `https://cdn.repub.ch/s3/republik-assets/dynamic-components/usz/img/${person.img}?&resize=96x`
          return (
            <div
              {...styles.castBox}
              {...(selectedCast === namehash && styles.selectedCast)}
              key={person.name}
              id={namehash}
              {...colorScheme.set(
                'backgroundColor',
                selectedCast === namehash ? 'text' : 'overlay'
              )}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  backgroundImage: `url('${imageSrc}')`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  marginRight: 8,
                  marginTop: 4,
                }}
                alt={`Portrait ${person.name}`}
              />
              <div style={{ flex: 1 }} {...rawHTMLRule}>
                <Editorial.Subhead style={{ marginTop: 0, marginBottom: 0 }}>
                  {person.name}
                </Editorial.Subhead>

                <RawHtml
                  type={Editorial.P}
                  dangerouslySetInnerHTML={{
                    __html: person.bio,
                  }}
                />
              </div>
            </div>
          )
        })}
      </OverlayBody>
    </Overlay>
  )
}

export default Cast
