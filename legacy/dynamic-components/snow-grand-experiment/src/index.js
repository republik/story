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
          grey: 'rgba(220, 220, 220, 0.8)',
          scrollBlockBg: 'rgba(255, 255, 255, 0.9)',
          lambeth: 'rgb(225,10,20)',
          'lambeth-background': 'rgba(225,10,20, 0.1)',
          southwark: 'rgb(31, 120, 180)',
          'southwark-background': 'rgba(31, 120, 180, 0.1)',
        },
        dark: {
          grey: 'rgba(90, 90, 90, 0.8)',
          scrollBlockBg: 'rgba(25, 25, 25, 0.9)',
          lambeth: '#E10A14',
          'lambeth-background': 'rgba(225,10,20, 0.4)',
          southwark: 'rgb(31, 120, 180)',
          'southwark-background': 'rgb(31, 120, 180, 0.4)',
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
