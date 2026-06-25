import * as React from 'react'
import { css } from 'glamor'

import { useHeaderHeight } from '@project-r/styleguide'

type Props = {}

const App: React.FC<Props> = ({}) => {

  const [, rules] = useHeaderHeight()

  const wrapperStyle = css(
    rules.reduce(
      (acc, { mediaQuery, headerHeight }) =>
        Object.assign(acc, { [mediaQuery]: { marginTop: headerHeight } }),
      {}
    )
  )

  return <div {...wrapperStyle}>Test</div>
}

export default App
