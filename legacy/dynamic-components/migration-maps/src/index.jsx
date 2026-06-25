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
          scrollBlockBg: 'rgba(255, 255, 255, 0.90)',
        },
        dark: {
          scrollBlockBg: 'rgba(25, 25, 25, 0.95)',
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
