import React from 'react'
import Deck from './Deck'
import { ColorContextProvider, colors, Interaction } from '@project-r/styleguide'
import { css } from 'glamor'
import { M_UP } from './constants'

const styles = {
  titleContainer: css({
    marginBottom: -1,
    backgroundColor: '#000',
    color: colors.negative.text,
    padding: 15,
    [M_UP]: {
      backgroundColor: colors.negative.primaryBg,
      padding: 25,
      marginBottom: -65,
      position: 'relative',
      zIndex: 1,
    },
  }),
}

const Index = ({ extract }) => {
  if (extract) {
    const query =
      typeof window !== 'undefined'
        ? window.location.search
            .substring(1)
            .split('&')
            .reduce((q, item) => {
              const [key, value] = item.split('=')
              q[key] = value
              return q
            }, {})
        : {}
    if (query.extract && query.share) {
      return (
        <div
          style={{
            width: 600,
            height: 314,
            transform: 'scale(2)',
            background: 'red',
            textAlign: 'center',
          }}
        >
          SHARE IMAGE
        </div>
      )
    }
    return null
  }

  return (
    <>
      <div {...styles.titleContainer}>
        <Interaction.H2
          style={{ color: colors.negative.text, textAlign: 'center' }}
        >
          101 Gründe, sich heute in die Republik zu verlieben 💕
        </Interaction.H2>
      </div>
      <ColorContextProvider colorSchemeKey='dark'>
        <Deck />
      </ColorContextProvider>
    </>
  )
}

export default Index
