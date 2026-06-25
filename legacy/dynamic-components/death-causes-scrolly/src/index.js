import React from 'react'
import {
  useColorContext,
  ColorContextLocalExtension,
} from '@project-r/styleguide'

import ScrollBlocks from './ScrollBlocks'

const App = (props) => {
  return (
    <ColorContextLocalExtension
      localColors={{
        light: {
          greyCircles: '#e6e6e6',
          scrollBlockBg: 'rgba(255, 255, 255, 0.90)',
          'Herz-Kreislauf-Erkrankungen': 'rgba(1, 192, 199, 0.9)',
          Krebserkrankungen: 'rgba(218, 52, 144, 0.9)',
          Unfälle: 'rgba(81, 67, 211, 0.9)',
          Suizid: 'rgba(232, 135, 26, 0.9)',
          Demenz: 'rgba(31, 199, 73, 0.9)',
          other: 'rgba(140, 140, 140, 0.9)',
          'Herz-Kreislauf-Erkrankungen-background': 'rgba(1, 192, 199, 0.1)',
          'Krebserkrankungen-background': 'rgba(218, 52, 144, 0.1)',
          'Unfälle-background': 'rgba(81, 67, 211, 0.1)',
          'Suizid-background': 'rgba(232, 135, 26, 0.1)',
          'Demenz-background': 'rgba(31, 199, 73, 0.1)',
          'other-background': 'rgb(140, 140, 140, 0.1)',
        },
        dark: {
          greyCircles: '#737373',
          scrollBlockBg: 'rgba(25, 25, 25, 0.90)',
          'Herz-Kreislauf-Erkrankungen': 'rgba(1, 221, 228, 1)',
          Krebserkrankungen: '#e368ac',
          Unfälle: '#5c9ef0',
          Suizid: '#efab5d',
          Demenz: 'rgba(71, 226, 111, 1)',
          other: 'rgb(204, 204, 204)',
          'Herz-Kreislauf-Erkrankungen-background': 'rgba(1, 221, 228, 0.35)',
          'Krebserkrankungen-background': 'rgba(227, 104, 172, 0.35)',
          'Unfälle-background': 'rgba(92, 158, 240, 0.35)',
          'Suizid-background': 'rgba(239, 171, 93, 0.35)',
          'Demenz-background': 'rgba(71, 226, 111, 0.35)',
          'other-background': 'rgb(204, 204, 204, 0.35)',
        },
      }}
    >
      <ScrollBlocks {...props} />
    </ColorContextLocalExtension>
  )
}

export function withColorScheme(Component) {
  return (props) => {
    const [colorScheme] = useColorContext()

    return <Component colorScheme={colorScheme} {...props} />
  }
}

export default App
